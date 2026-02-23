import Map "mo:core/Map";
import Array "mo:core/Array";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";
import Text "mo:core/Text";
import Float "mo:core/Float";
import Int "mo:core/Int";
import Nat "mo:core/Nat";
import AccessControl "authorization/access-control";
import MixinAuthorization "authorization/MixinAuthorization";
import Storage "blob-storage/Storage";
import MixinStorage "blob-storage/Mixin";


// Apply migration via with clause

actor {
  // Initialize the access control system
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);
  include MixinStorage();

  // User Profile Type
  public type UserProfile = {
    name : Text;
    email : Text;
  };

  // Types
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

  // Storage
  let userProfiles = Map.empty<Principal, UserProfile>();
  let blockReports = Map.empty<Principal, [BlockReport]>();
  let workHistories = Map.empty<Principal, [WorkHistory]>();
  let ceasedProfits = Map.empty<Principal, [CeasedProfits]>();
  let defenses = Map.empty<Principal, [LegalDefense]>();
  let galleryImages = Map.empty<Principal, [GalleryImage]>();

  // User Profile Management
  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can access profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  // Block Report Management
  public shared ({ caller }) func addBlockReport(report : BlockReport) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can add block reports");
    };

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

    switch (blockReports.get(caller)) {
      case (null) { [] };
      case (?reports) { reports };
    };
  };

  // Work History Management
  public shared ({ caller }) func addWorkHistory(history : WorkHistory) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can add work history");
    };

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

    switch (workHistories.get(caller)) {
      case (null) { [] };
      case (?histories) { histories };
    };
  };

  // Safe conversion from Nat to Float
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

  // Ceased Profits Calculation
  public shared ({ caller }) func calculateCeasedProfits(totalBlockedDays : Nat, avgDailyEarnings : Float, monthlyExpenses : Float) : async CeasedProfits {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can calculate ceased profits");
    };

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

    switch (ceasedProfits.get(caller)) {
      case (null) { [] };
      case (?data) { data };
    };
  };

  // AI-Powered Legal Defense Generator
  public shared ({ caller }) func generateLegalDefense(blockType : Text, context : Text) : async LegalDefense {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can generate legal defenses");
    };

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

    switch (defenses.get(caller)) {
      case (null) { [] };
      case (?data) { data };
    };
  };

  // Dashboard Homepage
  public query ({ caller }) func getDashboard() : async DashboardData {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can access the dashboard");
    };

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

  // Image Gallery
  public shared ({ caller }) func uploadGalleryImage(id : Text, title : Text, description : Text, image : Storage.ExternalBlob) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can upload gallery images");
    };

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

    switch (galleryImages.get(caller)) {
      case (null) { [] };
      case (?images) { images };
    };
  };
};
