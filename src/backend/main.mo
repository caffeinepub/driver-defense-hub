import Map "mo:core/Map";
import Array "mo:core/Array";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";
import AccessControl "authorization/access-control";
import MixinAuthorization "authorization/MixinAuthorization";
import Storage "blob-storage/Storage";
import MixinStorage "blob-storage/Mixin";

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
  public type TripData = {
    distance : Float;
    fuelCost : Float;
    tolls : Float;
    maintenance : Float;
    fines : Float;
  };

  public type FinancialBreakdown = {
    distance : Float;
    fuelCost : Float;
    tolls : Float;
    maintenance : Float;
    fines : Float;
    total : Float;
  };

  public type IncidentDetails = {
    date : Text;
    location : Text;
    violationType : Text;
    circumstances : Text;
  };

  public type LegalDefense = {
    arguments : [Text];
    applicableLaws : [Text];
    suggestedNextSteps : [Text];
    structuredDocument : Text;
  };

  public type DashboardData = {
    savedCalculations : [FinancialBreakdown];
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
  let calculations = Map.empty<Principal, [FinancialBreakdown]>();
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

  // Financial Loss Calculator
  public shared ({ caller }) func calculateFinancialLoss(tripData : TripData) : async FinancialBreakdown {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can calculate financial losses");
    };

    let breakdown : FinancialBreakdown = {
      distance = tripData.distance;
      fuelCost = tripData.fuelCost;
      tolls = tripData.tolls;
      maintenance = tripData.maintenance;
      fines = tripData.fines;
      total = tripData.distance + tripData.fuelCost + tripData.tolls + tripData.maintenance + tripData.fines;
    };

    switch (calculations.get(caller)) {
      case (null) {
        calculations.add(caller, [breakdown]);
      };
      case (?existing) {
        calculations.add(caller, existing.concat([breakdown]));
      };
    };

    breakdown;
  };

  // AI-Powered Legal Defense Generator
  public shared ({ caller }) func generateLegalDefense(incident : IncidentDetails) : async LegalDefense {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can generate legal defenses");
    };

    let defense : LegalDefense = {
      arguments = [
        "Argument 1: Circumstance justification based on " # incident.circumstances,
        "Argument 2: Violation type clarification for " # incident.violationType,
        "Argument 3: Location and timing considerations for incident at " # incident.location # " on " # incident.date,
      ];
      applicableLaws = [
        "Law 1: Traffic regulation applicable to " # incident.violationType,
        "Law 2: Penalty mitigation provisions",
        "Law 3: Due process requirements",
      ];
      suggestedNextSteps = [
        "Step 1: Gather and submit all relevant evidence",
        "Step 2: Contact a legal representative specializing in traffic violations",
        "Step 3: File formal response within required timeframe",
        "Step 4: Prepare for hearing if necessary",
      ];
      structuredDocument = "LEGAL DEFENSE DOCUMENT\n\nDate of Incident: " # incident.date # "\nLocation: " # incident.location # "\nViolation Type: " # incident.violationType # "\n\nCircumstances:\n" # incident.circumstances # "\n\nLegal Arguments:\n- Circumstance justification\n- Violation clarification\n- Location and timing considerations\n\nApplicable Laws:\n- Traffic regulations\n- Penalty mitigation\n- Due process\n\nRecommended Actions:\n- Evidence submission\n- Legal consultation\n- Formal response filing";
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

  // Dashboard Homepage
  public query ({ caller }) func getDashboard() : async DashboardData {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can access the dashboard");
    };

    let userCalculations = switch (calculations.get(caller)) {
      case (null) { [] };
      case (?calc) { calc };
    };

    let userDefenses = switch (defenses.get(caller)) {
      case (null) { [] };
      case (?defs) { defs };
    };

    {
      savedCalculations = userCalculations;
      savedDefenses = userDefenses;
    };
  };

  public query ({ caller }) func getAllFinancialLosses() : async [FinancialBreakdown] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can access financial loss data");
    };

    switch (calculations.get(caller)) {
      case (null) { [] };
      case (?data) { data };
    };
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
