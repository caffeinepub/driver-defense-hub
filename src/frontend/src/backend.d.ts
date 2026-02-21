import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export class ExternalBlob {
    getBytes(): Promise<Uint8Array<ArrayBuffer>>;
    getDirectURL(): string;
    static fromURL(url: string): ExternalBlob;
    static fromBytes(blob: Uint8Array<ArrayBuffer>): ExternalBlob;
    withUploadProgress(onProgress: (percentage: number) => void): ExternalBlob;
}
export interface LegalDefense {
    structuredDocument: string;
    suggestedNextSteps: Array<string>;
    arguments: Array<string>;
    applicableLaws: Array<string>;
}
export interface FinancialBreakdown {
    fines: number;
    tolls: number;
    total: number;
    distance: number;
    fuelCost: number;
    maintenance: number;
}
export interface IncidentDetails {
    date: string;
    circumstances: string;
    location: string;
    violationType: string;
}
export interface GalleryImage {
    id: string;
    title: string;
    description: string;
    image: ExternalBlob;
}
export interface DashboardData {
    savedCalculations: Array<FinancialBreakdown>;
    savedDefenses: Array<LegalDefense>;
}
export interface TripData {
    fines: number;
    tolls: number;
    distance: number;
    fuelCost: number;
    maintenance: number;
}
export interface UserProfile {
    name: string;
    email: string;
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    calculateFinancialLoss(tripData: TripData): Promise<FinancialBreakdown>;
    generateLegalDefense(incident: IncidentDetails): Promise<LegalDefense>;
    getAllFinancialLosses(): Promise<Array<FinancialBreakdown>>;
    getAllLegalDefenses(): Promise<Array<LegalDefense>>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getDashboard(): Promise<DashboardData>;
    getGalleryImages(): Promise<Array<GalleryImage>>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    uploadGalleryImage(id: string, title: string, description: string, image: ExternalBlob): Promise<void>;
}
