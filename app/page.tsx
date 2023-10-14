import Item from "@/components/Item";

export default function Home() {
  return (
    <main
      className="flex min-h-screen flex-col bg-cover bg-fixed bg-center bg-no-repeat"
      style={{ backgroundImage: "url(./images/bg.jpg)" }}
    >
      <div className="flex flex-1 flex-col items-center gap-2">
        <h1 className="text-4xl font-semibold text-white">Unlock Container</h1>
        <h4 className="text-xl">
          Unlock <span className="font-semibold">Revolution Case</span>
        </h4>
        <h5 className="text-sm">This container can only be opened once</h5>
      </div>

      <div className="flex flex-col backdrop-blur-md">
        <div className="m-4">
          <div className="flex justify-between">
            <span>Contains one of the following:</span>
            <span>INSPECT ITEMS</span>
          </div>
          <hr className="opacity-30" />
        </div>

        <div className="flex flex-wrap gap-8 px-10">
          <Item itemName="MAG-7" skinName="Insomnia" tier="milspec" />
          <Item itemName="MP9" skinName="Featherweight" tier="milspec" />
          <Item
            itemName="Glock-18"
            skinName="Umbral Rabbit"
            tier="restricted"
          />
          <Item itemName="MAC-10" skinName="Sakkaku" tier="restricted" />
          <Item itemName="UMP-45" skinName="Wild Child" tier="classified" />
          <Item itemName="P2000" skinName="Wicked Sick" tier="classified" />
          <Item itemName="M4A4" skinName="Temukau" tier="covert" />
          <Item itemName="AK-47" skinName="Head Shot" tier="covert" />
          <Item itemName="⭐ Exceedingly Rare Item ⭐" tier="special" />
        </div>

        <div className="container my-10 flex items-center justify-between px-36">
          <hr className="opacity-30" />
          <span>Use Revolution Case Key</span>
          <div className="flex items-center gap-2">
            <button className="rounded bg-[#048b59] p-3 font-semibold tracking-tighter">
              UNLOCK CONTAINER
            </button>

            <button className="rounded p-3 font-semibold tracking-tighter hover:bg-neutral-600">
              CLOSE
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
