import { useRouter } from "next/navigation"
export function BottomWarning({ Warning, page}) {
    const router = useRouter();

    return (
        <div className="flex justify-center text-lg mb-6">
            <div className="mx-2">{Warning}</div>
            <button className="underline" onClick={() => router.push("/"+page)}>{page}</button>
        </div>
    )
}