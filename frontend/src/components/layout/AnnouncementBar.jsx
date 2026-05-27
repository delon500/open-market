export default function AnnouncementBar(){
    return (
        <div className="w-full bg-[#003527] px-4 py-2 text-center text-[#ffe088]">
            <div className="mx-auto flex max-w-[1280px] items-center justify-center gap-2">
                <span className="material-symbols-outlined text-[18px]">shield_locked</span>
                <span className="text-sm font-semibold">
                    Buyer Protection on every order — payments held until delivery is confirmed.
                </span>
            </div>
        </div>
    );
}