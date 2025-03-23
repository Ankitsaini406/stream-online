import { NextResponse } from "next/server";
import axios from "axios";

export async function GET() {
    try {
        const url = "https://api.consumet.org/anime/zoro/popular"; // Get popular anime list
        const response = await axios.get(url);

        return NextResponse.json(response.data);
    } catch {
        return NextResponse.json({ error: "Failed to fetch anime list" }, { status: 500 });
    }
}
