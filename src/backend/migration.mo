import Map "mo:core/Map";
import Principal "mo:core/Principal";
import Time "mo:core/Time";

module {
  type OldUserProfile = {
    name : Text;
    email : Text;
  };

  type OldActor = {
    userProfiles : Map.Map<Principal, OldUserProfile>;
  };

  type NewUserProfile = {
    name : Text;
    email : Text;
    registrationDate : Time.Time;
    isBlocked : Bool;
  };

  type NewActor = {
    userProfiles : Map.Map<Principal, NewUserProfile>;
  };

  public func run(old : OldActor) : NewActor {
    let newUserProfiles = old.userProfiles.map<Principal, OldUserProfile, NewUserProfile>(
      func(_principal, oldUserProfile) {
        {
          oldUserProfile with
          registrationDate = Time.now();
          isBlocked = false;
        };
      }
    );
    { userProfiles = newUserProfiles };
  };
};
