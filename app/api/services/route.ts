import { NextResponse } from "next/server";
import { services} from "@/lib/mockData";

export async function GET(){
    return NextResponse.json({
        success: true,
        data: services,
    });
}