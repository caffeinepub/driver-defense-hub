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
export interface BlockReport {
    id: string;
    cpf: string;
    blockDate: string;
    platform: string;
    additionalContext: string;
    blockReason: string;
    phone: string;
    driverName: string;
}
export interface LegalDefense {
    blockType: string;
    structuredDocument: string;
    suggestedNextSteps: Array<string>;
    arguments: Array<string>;
    applicableLaws: Array<string>;
}
export interface GalleryImage {
    id: string;
    title: string;
    description: string;
    image: ExternalBlob;
}
export interface DashboardData {
    ceasedProfitsCalculations: Array<CeasedProfits>;
    savedDefenses: Array<LegalDefense>;
    workHistories: Array<WorkHistory>;
    blockReports: Array<BlockReport>;
}
export interface CeasedProfits {
    netLostProfits: number;
    totalLostEarnings: number;
    totalBlockedDays: bigint;
    totalExpensesDuringBlock: number;
    avgDailyEarnings: number;
}
export interface WorkHistory {
    monthlyVehicleFinancing: number;
    activeMonths: bigint;
    dailyAvgEarnings: number;
    weeklyAvgEarnings: number;
    monthlyInsurance: number;
    monthlyFuel: number;
    monthlyMaintenance: number;
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
    addBlockReport(report: BlockReport): Promise<void>;
    addWorkHistory(history: WorkHistory): Promise<void>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    calculateCeasedProfits(totalBlockedDays: bigint, avgDailyEarnings: number, monthlyExpenses: number): Promise<CeasedProfits>;
    generateLegalDefense(blockType: string, context: string): Promise<LegalDefense>;
    getAllBlockReports(): Promise<Array<BlockReport>>;
    getAllCeasedProfits(): Promise<Array<CeasedProfits>>;
    getAllLegalDefenses(): Promise<Array<LegalDefense>>;
    getAllWorkHistories(): Promise<Array<WorkHistory>>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getDashboard(): Promise<DashboardData>;
    getGalleryImages(): Promise<Array<GalleryImage>>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    uploadGalleryImage(id: string, title: string, description: string, image: ExternalBlob): Promise<void>;
}
