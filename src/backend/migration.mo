import Map "mo:core/Map";
import Nat "mo:core/Nat";
import Principal "mo:core/Principal";
import Storage "blob-storage/Storage";

module {
  type OldTripData = {
    distance : Float;
    fuelCost : Float;
    tolls : Float;
    maintenance : Float;
    fines : Float;
  };

  type OldFinancialBreakdown = {
    distance : Float;
    fuelCost : Float;
    tolls : Float;
    maintenance : Float;
    fines : Float;
    total : Float;
  };

  type OldIncidentDetails = {
    date : Text;
    location : Text;
    violationType : Text;
    circumstances : Text;
  };

  type OldLegalDefense = {
    arguments : [Text];
    applicableLaws : [Text];
    suggestedNextSteps : [Text];
    structuredDocument : Text;
  };

  type OldDashboardData = {
    savedCalculations : [OldFinancialBreakdown];
    savedDefenses : [OldLegalDefense];
  };

  type OldGalleryImage = {
    id : Text;
    title : Text;
    description : Text;
    image : Storage.ExternalBlob;
  };

  type OldActor = {
    userProfiles : Map.Map<Principal, UserProfile>;
    calculations : Map.Map<Principal, [OldFinancialBreakdown]>;
    defenses : Map.Map<Principal, [OldLegalDefense]>;
    galleryImages : Map.Map<Principal, [OldGalleryImage]>;
  };

  public type UserProfile = {
    name : Text;
    email : Text;
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

  public type NewActor = {
    userProfiles : Map.Map<Principal, UserProfile>;
    blockReports : Map.Map<Principal, [BlockReport]>;
    workHistories : Map.Map<Principal, [WorkHistory]>;
    ceasedProfits : Map.Map<Principal, [CeasedProfits]>;
    defenses : Map.Map<Principal, [LegalDefense]>;
    galleryImages : Map.Map<Principal, [GalleryImage]>;
  };

  func migrateOldLegalDefense(old : OldLegalDefense) : LegalDefense {
    {
      arguments = old.arguments;
      applicableLaws = old.applicableLaws;
      suggestedNextSteps = old.suggestedNextSteps;
      structuredDocument = old.structuredDocument;
      blockType = "unknown";
    };
  };

  public func run(old : OldActor) : NewActor {
    {
      userProfiles = old.userProfiles;
      blockReports = Map.empty<Principal, [BlockReport]>();
      workHistories = Map.empty<Principal, [WorkHistory]>();
      ceasedProfits = Map.empty<Principal, [CeasedProfits]>();
      defenses = old.defenses.map(
        func(_k, v) {
          v.map(
            func(x) { migrateOldLegalDefense(x) }
          );
        }
      );
      galleryImages = old.galleryImages;
    };
  };
};
