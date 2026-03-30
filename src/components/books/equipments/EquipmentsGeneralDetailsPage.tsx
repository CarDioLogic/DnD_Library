import { useCallback, useEffect, useRef, forwardRef } from "react";
import Page from "../../flipbook/Page";
import { fetchEquipmentDetails } from "../../../../apiClient/equipmentsApi";
import Icon from "../../general/Icon";

type Props = {
  equipmentIndex: string;
  pageNumber: number;
  currentPage: number;
};

const EquipmentsGeneralDetailsPage = forwardRef<HTMLDivElement, Props>(
  ({ equipmentIndex, pageNumber, currentPage }, ref) => {
    const controllerRef = useRef<AbortController | null>(null);

    const getEquipmentDetails = useCallback(async () => {
      if (controllerRef.current) {
        controllerRef.current.abort();
      }

      const controller = new AbortController();
      controllerRef.current = controller;

      try {
        const equipment = await fetchEquipmentDetails(
          equipmentIndex,
          controller.signal
        );

        return (
          <>
            <div>
              <div className="flex flex-wrap justify-between">
                <h1 className="page-text-xl font-bold break-words leading-none">
                  {equipment.name}
                </h1>

                <div className="flex gap-2">
                  {equipment.cost && (
                    <Icon
                      imgSrc="/images/misc/coins.svg"
                      altText="equipment cost"
                      label={`${equipment.cost.quantity} (${equipment.cost.unit})`}
                    />
                  )}

                  {equipment.weight != null && (
                    <Icon
                      imgSrc="/images/misc/weight.svg"
                      altText="equipment weight"
                      label={`${equipment.weight}`}
                    />
                  )}
                </div>
              </div>

              <p>
                {[equipment.equipment_category?.name, equipment.gear_category?.name]
                  .filter(Boolean)
                  .join(" - ")}
              </p>
            </div>

            <hr />

            {equipment.properties?.length > 0 && (
              <>
                <div>
                  <p><strong>Properties:</strong></p>
                  {equipment.properties.map((prop: any, i: number) => (
                    <p key={`${prop.name}-${i}`} title={prop.desc}>
                      {prop.name}
                    </p>
                  ))}
                </div>
                <hr />
              </>
            )}

            {equipment.armor_category && (
              <>
                <div>
                  <p>Strength minimum: {equipment.str_minimum}</p>
                  <p>
                    Stealth disadvantage: {equipment.stealth_disadvantage ? "Yes" : "No"}
                  </p>
                  <p>Armor category: {equipment.armor_category}</p>

                  <div className="flex justify-between">
                    <p>
                      Armor class:{" "}
                      {[
                        equipment.armor_class?.base,
                        equipment.armor_class?.max_bonus,
                      ]
                        .filter((v) => v !== null && v !== undefined)
                        .join(" + ")}
                    </p>

                    <p>
                      Dex bonus: {equipment.armor_class?.dex_bonus ? "Yes" : "No"}
                    </p>
                  </div>
                </div>
                <hr />
              </>
            )}

            {equipment.weapon_category && (
              <>
                <div>
                  <p><strong>Weapon category:</strong> {equipment.weapon_category}</p>
                  <p><strong>Weapon range:</strong> {equipment.weapon_range}</p>
                  <p><strong>Category range:</strong> {equipment.category_range}</p>

                  {equipment.range?.normal && (
                    <p><strong>Range:</strong> {equipment.range.normal}</p>
                  )}

                  {equipment.range?.long && (
                    <p><strong>Range (long):</strong> {equipment.range.long}</p>
                  )}

                  {equipment.throw_range?.normal && (
                    <p><strong>Throw range:</strong> {equipment.throw_range.normal}</p>
                  )}

                  {equipment.throw_range?.long && (
                    <p><strong>Throw range (long):</strong> {equipment.throw_range.long}</p>
                  )}

                  {equipment.damage && (
                    <div className="flex items-center gap-2">
                      <p><strong>Damage:</strong></p>

                      {equipment.damage.damage_dice && (
                        <p>{equipment.damage.damage_dice}</p>
                      )}

                      {equipment.damage.damage_type && (
                        <Icon
                          title={equipment.damage.damage_type.name}
                          imgSrc={`/images/damageTypes/${equipment.damage.damage_type.name}.svg`}
                        />
                      )}
                    </div>
                  )}

                  {equipment.two_handed_damage && (
                    <div className="flex items-center gap-2">
                      <p><strong>Two handed damage:</strong></p>

                      {equipment.two_handed_damage.damage_dice && (
                        <p>{equipment.two_handed_damage.damage_dice}</p>
                      )}

                      {equipment.two_handed_damage.damage_type && (
                        <Icon
                          title={equipment.two_handed_damage.damage_type.name}
                          imgSrc={`/images/damageTypes/${equipment.two_handed_damage.damage_type.name}.svg`}
                        />
                      )}
                    </div>
                  )}
                </div>
                <hr />
              </>
            )}

            {equipment.tool_category && (
              <p><strong>Tool category: </strong>{equipment.tool_category}</p>
            )}

            {equipment.vehicle_category && (
              <div>
                <p><strong>Vehicle category: </strong>{equipment.vehicle_category}</p>
                {equipment.speed && (
                  <p><strong>Speed: </strong>{equipment.speed.quantity} ({equipment.speed.unit})</p>
                )}
              </div>
            )}

            {equipment.quantity && (
              <>
              <p className="mt-2 text-end"><strong>Quantity:</strong>{equipment.quantity}x</p>
              </>
            )}

          </>
        );
      } catch (error: any) {
        if (error?.name === "CanceledError" || error?.name === "AbortError") {
          return null;
        }

        console.error("Failed to load equipment details:", error);
        return <div>Failed to load equipment details.</div>;
      }
    }, [equipmentIndex]);

    useEffect(() => {
      return () => {
        if (controllerRef.current) {
          controllerRef.current.abort();
        }
      };
    }, []);

    return (
      <Page
        ref={ref}
        currentPage={currentPage}
        pageNumber={pageNumber}
        pagePrefix={`${equipmentIndex} - `}
        getPageContentFunc={getEquipmentDetails}
      />
    );
  }
);

EquipmentsGeneralDetailsPage.displayName = "EquipmentsGeneralDetailsPage";

export default EquipmentsGeneralDetailsPage;