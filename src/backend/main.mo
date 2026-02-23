import Map "mo:core/Map";
import Array "mo:core/Array";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";
import Text "mo:core/Text";
import Float "mo:core/Float";
import Nat "mo:core/Nat";
import AccessControl "authorization/access-control";
import MixinAuthorization "authorization/MixinAuthorization";
import Storage "blob-storage/Storage";
import MixinStorage "blob-storage/Mixin";
import Time "mo:core/Time";
import Migration "migration";

(with migration = Migration.run)
actor {
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);
  include MixinStorage();

  public type UserProfile = {
    name : Text;
    email : Text;
    registrationDate : Time.Time;
    isBlocked : Bool;
  };

  public type UserProfileWithPrincipal = {
    principal : Principal;
    profile : UserProfile;
  };

  public type AdminActionType = {
    #blockUser : { userName : Text };
    #unblockUser : { userName : Text };
    #other : Text;
  };

  public type AdminAction = {
    admin : Principal;
    action : AdminActionType;
    timestamp : Time.Time;
  };

  public type BlockReport = {
    id : Text;
    platform : Text;
    blockReason : Text;
    driverName : Text;
    cpf : Text;
    phone : Text;
    blockDate : Text;
    additionalContext : Text;
  };

  public type WorkHistory = {
    activeMonths : Nat;
    dailyAvgEarnings : Float;
    weeklyAvgEarnings : Float;
    monthlyVehicleFinancing : Float;
    monthlyInsurance : Float;
    monthlyFuel : Float;
    monthlyMaintenance : Float;
  };

  public type CeasedProfits = {
    totalBlockedDays : Nat;
    avgDailyEarnings : Float;
    totalLostEarnings : Float;
    totalExpensesDuringBlock : Float;
    netLostProfits : Float;
  };

  public type LegalDefense = {
    blockType : Text;
    arguments : [Text];
    applicableLaws : [Text];
    suggestedNextSteps : [Text];
    structuredDocument : Text;
  };

  public type DashboardData = {
    blockReports : [BlockReport];
    workHistories : [WorkHistory];
    ceasedProfitsCalculations : [CeasedProfits];
    savedDefenses : [LegalDefense];
  };

  public type GalleryImage = {
    id : Text;
    title : Text;
    description : Text;
    image : Storage.ExternalBlob;
  };

  public type AdminDashboardStats = {
    totalUsers : Nat;
    blockedUsers : Nat;
    activeUsers : Nat;
    recentRegistrations : [UserProfile];
  };

  let userProfiles = Map.empty<Principal, UserProfile>();
  let blockReports = Map.empty<Principal, [BlockReport]>();
  let workHistories = Map.empty<Principal, [WorkHistory]>();
  let ceasedProfits = Map.empty<Principal, [CeasedProfits]>();
  let defenses = Map.empty<Principal, [LegalDefense]>();
  let galleryImages = Map.empty<Principal, [GalleryImage]>();
  let adminActivityLog = Map.empty<Principal, [AdminAction]>();

  func isUserBlocked(user : Principal) : Bool {
    switch (userProfiles.get(user)) {
      case (?profile) { profile.isBlocked };
      case (null) { false };
    };
  };

  func requireNotBlocked(caller : Principal) {
    if (isUserBlocked(caller)) {
      Runtime.trap("Access denied: Your account has been blocked");
    };
  };

  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can access profiles");
    };
    requireNotBlocked(caller);
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    if (caller == user) {
      requireNotBlocked(caller);
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    requireNotBlocked(caller);
    let newProfile = {
      profile with
      registrationDate = Time.now();
      isBlocked = false;
    };
    userProfiles.add(caller, newProfile);
  };

  public query ({ caller }) func getAllUsers() : async [UserProfileWithPrincipal] {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can access all users");
    };

    let allProfiles = userProfiles.toArray();
    allProfiles.map(func((principal, profile)) : UserProfileWithPrincipal {
      { principal; profile };
    });
  };

  public shared ({ caller }) func blockUser(user : Principal, userName : Text) : async () {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can block users");
    };

    switch (userProfiles.get(user)) {
      case (?profile) {
        let updatedProfile = { profile with isBlocked = true };
        userProfiles.add(user, updatedProfile);
        addAdminAction(#blockUser({ userName }), caller);
      };
      case (null) {
        Runtime.trap("User not found");
      };
    };
  };

  public shared ({ caller }) func unblockUser(user : Principal, userName : Text) : async () {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can unblock users");
    };

    switch (userProfiles.get(user)) {
      case (?profile) {
        let updatedProfile = { profile with isBlocked = false };
        userProfiles.add(user, updatedProfile);
        addAdminAction(#unblockUser({ userName }), caller);
      };
      case (null) {
        Runtime.trap("User not found");
      };
    };
  };

  public query ({ caller }) func getAdminDashboardStats() : async AdminDashboardStats {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can access dashboard stats");
    };

    let allProfiles = userProfiles.toArray();
    let totalUsers = allProfiles.size();

    var blockedCount = 0;
    var activeCount = 0;
    for ((_, profile) in allProfiles.values()) {
      if (profile.isBlocked) {
        blockedCount += 1;
      } else {
        activeCount += 1;
      };
    };

    let recentRegistrations = allProfiles.map(func((_, profile)) { profile });

    {
      totalUsers;
      blockedUsers = blockedCount;
      activeUsers = activeCount;
      recentRegistrations;
    };
  };

  public query ({ caller }) func getAdminActivityLog() : async [AdminAction] {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can access activity log");
    };

    let allActions = adminActivityLog.toArray().map(func((_, actions)) { actions }).flatten();
    allActions;
  };

  func addAdminAction(actionType : AdminActionType, admin : Principal) {
    let adminAction : AdminAction = {
      admin;
      action = actionType;
      timestamp = Time.now();
    };

    switch (adminActivityLog.get(admin)) {
      case (null) {
        adminActivityLog.add(admin, [adminAction]);
      };
      case (?existing) {
        adminActivityLog.add(admin, existing.concat([adminAction]));
      };
    };
  };

  public shared ({ caller }) func addBlockReport(report : BlockReport) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can add block reports");
    };
    requireNotBlocked(caller);

    switch (blockReports.get(caller)) {
      case (null) {
        blockReports.add(caller, [report]);
      };
      case (?existing) {
        blockReports.add(caller, existing.concat([report]));
      };
    };
  };

  public query ({ caller }) func getAllBlockReports() : async [BlockReport] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can access block reports");
    };
    requireNotBlocked(caller);

    switch (blockReports.get(caller)) {
      case (null) { [] };
      case (?reports) { reports };
    };
  };

  public shared ({ caller }) func addWorkHistory(history : WorkHistory) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can add work history");
    };
    requireNotBlocked(caller);

    switch (workHistories.get(caller)) {
      case (null) {
        workHistories.add(caller, [history]);
      };
      case (?existing) {
        workHistories.add(caller, existing.concat([history]));
      };
    };
  };

  public query ({ caller }) func getAllWorkHistories() : async [WorkHistory] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can access work history");
    };
    requireNotBlocked(caller);

    switch (workHistories.get(caller)) {
      case (null) { [] };
      case (?histories) { histories };
    };
  };

  func natToFloat(n : Nat) : Float {
    var result : Float = 0.0;
    var current = n;
    if (current >= 1) {
      result := 1.0;
      current -= 1;
    };
    while (current > 0) {
      result := result * 2.0;
      current /= 2;
    };
    result;
  };

  public shared ({ caller }) func calculateCeasedProfits(totalBlockedDays : Nat, avgDailyEarnings : Float, monthlyExpenses : Float) : async CeasedProfits {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can calculate ceased profits");
    };
    requireNotBlocked(caller);

    let blockedDaysFloat = avgDailyEarnings * natToFloat(totalBlockedDays);
    let totalLostEarnings = blockedDaysFloat;
    let dailyExpenses = monthlyExpenses / 30.0;
    let totalExpensesDuringBlock = dailyExpenses * natToFloat(totalBlockedDays);
    let netLostProfits = totalLostEarnings - totalExpensesDuringBlock;

    let profits : CeasedProfits = {
      totalBlockedDays;
      avgDailyEarnings;
      totalLostEarnings;
      totalExpensesDuringBlock;
      netLostProfits;
    };

    switch (ceasedProfits.get(caller)) {
      case (null) {
        ceasedProfits.add(caller, [profits]);
      };
      case (?existing) {
        ceasedProfits.add(caller, existing.concat([profits]));
      };
    };

    profits;
  };

  public query ({ caller }) func getAllCeasedProfits() : async [CeasedProfits] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can access ceased profits data");
    };
    requireNotBlocked(caller);

    switch (ceasedProfits.get(caller)) {
      case (null) { [] };
      case (?data) { data };
    };
  };

  public shared ({ caller }) func generateLegalDefense(blockType : Text, context : Text) : async LegalDefense {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can generate legal defenses");
    };
    requireNotBlocked(caller);

    let defense : LegalDefense = {
      blockType;
      arguments = [
        "Argument 1: Context justification for " # blockType # " based on " # context,
        "Argument 2: Block type clarification for " # blockType,
        "Argument 3: Additional considerations for block type: " # blockType,
      ];
      applicableLaws = [
        "Brazilian Labor Law: CLT Article 483 - Unjust Dismissals",
        "Consumer Protection Code: Articles 6 and 7 - Service Providers",
        "Platform Liability: Law 13.467/2017 - Worker Rights",
      ];
      suggestedNextSteps = [
        "Step 1: Gather all relevant evidence",
        "Step 2: Contact a specialized legal representative",
        "Step 3: File formal response within required timeframe",
        "Step 4: Prepare for potential hearing",
      ];
      structuredDocument = "LEGAL DEFENSE DOCUMENT\n\nBlock Type: " # blockType # "\n\nContext:\n" # context # "\n\nLegal Arguments:\n- Context justification\n- Block type clarification\n- Additional considerations\n\nApplicable Laws:\n- CLT Article 483\n- Consumer Protection Code\n- Law 13.467/2017\n\nRecommended Actions:\n- Evidence submission\n- Legal consultation\n- Formal response filing";
    };

    switch (defenses.get(caller)) {
      case (null) {
        defenses.add(caller, [defense]);
      };
      case (?existing) {
        defenses.add(caller, existing.concat([defense]));
      };
    };

    defense;
  };

  public query ({ caller }) func getAllLegalDefenses() : async [LegalDefense] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can access legal defense data");
    };
    requireNotBlocked(caller);

    switch (defenses.get(caller)) {
      case (null) { [] };
      case (?data) { data };
    };
  };

  public query ({ caller }) func getDashboard() : async DashboardData {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can access the dashboard");
    };
    requireNotBlocked(caller);

    let reports = switch (blockReports.get(caller)) {
      case (null) { [] };
      case (?reports) { reports };
    };

    let histories = switch (workHistories.get(caller)) {
      case (null) { [] };
      case (?histories) { histories };
    };

    let profits = switch (ceasedProfits.get(caller)) {
      case (null) { [] };
      case (?profits) { profits };
    };

    let defensesData = switch (defenses.get(caller)) {
      case (null) { [] };
      case (?defenses) { defenses };
    };

    {
      blockReports = reports;
      workHistories = histories;
      ceasedProfitsCalculations = profits;
      savedDefenses = defensesData;
    };
  };

  public shared ({ caller }) func uploadGalleryImage(id : Text, title : Text, description : Text, image : Storage.ExternalBlob) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can upload gallery images");
    };
    requireNotBlocked(caller);

    let galleryImage : GalleryImage = {
      id;
      title;
      description;
      image;
    };

    switch (galleryImages.get(caller)) {
      case (null) {
        galleryImages.add(caller, [galleryImage]);
      };
      case (?existing) {
        galleryImages.add(caller, existing.concat([galleryImage]));
      };
    };
  };

  public query ({ caller }) func getGalleryImages() : async [GalleryImage] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can access gallery images");
    };
    requireNotBlocked(caller);

    switch (galleryImages.get(caller)) {
      case (null) { [] };
      case (?images) { images };
    };
  };
};
