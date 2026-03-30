import { useCallback, useEffect, useRef, forwardRef } from "react";
import Page from "../../flipbook/Page";
import { fetchSpellExtraDetails } from "../../../../apiClient/spellsApi";
import Icon from "../../general/Icon";
import { ABILITIES } from "../../../../Data/Abilities";
import { formatAbilityModifier, } from "../../../../Core/helpers";

const GrimoireSpellExtraDetailsPage = forwardRef(
  ({ spellIndex, pageNumber, currentPage }, ref) => {
    const controllerRef = useRef(null);

    const getSpellDetails = useCallback(async () => {
      if (controllerRef.current) {
        controllerRef.current.abort();
      }

      const controller = new AbortController();
      controllerRef.current = controller;

      try {
        const spell = await fetchSpellExtraDetails(
          spellIndex,
          controller.signal
        );
      
        return (
          <>
              { spell.higher_level && (
                <div>
                  <p className="page-text-sm"><strong className="mr-2">Higher level:</strong></p>
                  <p className="page-text-xs">{spell.higher_level}</p>
                </div>
              )}   
              <p className="page-text-sm"><strong className="mr-2">Level:</strong>{spell.level}</p>
              <p className="page-text-sm"><strong className="mr-2">Component:</strong>{spell.components.join(",")}</p>         
              { spell.attack_type && (
                <p className="page-text-sm"><strong className="mr-2">Attack type:</strong>{spell.attack_type}</p>
              )}
               {spell.classes.length > 0 && (
                <div className="flex gap-1 items-center">
                  <p className="page-text-sm"><strong className="mr-2">Classes:</strong></p>
                    {
                        spell.classes.map(c => (
                          <Icon
                          key={c.index}
                          title={`Class: ${c.name}`}
                          imgSrc={`/images/classes/${c.index}.svg`}
                          altText="class icon"
                          />
                      ))
                    }
                </div> 
               )}      
              { spell.area_of_effect && (
                <p className="page-text-sm"><strong className="mr-2">Area of effect:</strong> {`${spell.area_of_effect.type} (${spell.area_of_effect.size}m)`}</p>
              )}  
              {spell.heal_at_slot_level && (
                <p className="page-text-sm">
                  <strong className="mr-2">Heal levels:</strong>
                  {spell.heal_at_slot_level
                    .map(h => `${h.level} (${h.value})`)
                    .join(", ")}
                </p>
              )}
              {spell.damage && (
                <div>
                  <div className="flex gap-1 items-center">
                    <p className="page-text-sm">
                      <strong className="mr-2">Spell damage type:</strong>
                    </p>
                    <Icon
                      title={spell.damage.damage_type.name}
                      imgSrc={`/images/damageTypes/${spell.damage.damage_type.name}.svg`}
                    />
                  </div>
                  { spell.damage.damage_at_slot_level && (
                    <p className="page-text-sm">
                      <strong className="mr-2">Damage per spell level:</strong>
                      {spell.damage.damage_at_slot_level
                        .map(d => `${d.level} (${d.value})`)
                        .join(", ")}
                    </p>
                  )}
                  { spell.damage.damage_at_character_level && (
                    <p className="page-text-sm">
                      <strong className="mr-2">Damage per character level:</strong>
                      {spell.damage.damage_at_character_level
                        .map(d => `${d.level} (${d.value})`)
                        .join(", ")}
                    </p>
                  )}
                </div>
              )}
              { spell.dc && (
                <>
                  <p className="page-text-sm" title={spell.dc.dc_success}>
                    <strong className="mr-2">DC success:</strong>
                    {spell.dc.dc_success}
                  </p>
                  <div className="flex gap-1 items-center">
                    <p className="page-text-sm">
                      <strong className="mr-2">DC type:</strong>
                    </p>
                    <Icon
                      title={spell.dc.dc_type.full_name}
                      imgSrc={`/images/abilities/${spell.dc.dc_type.full_name.toLowerCase()}.svg`}
                    />
                  </div>
                </>
              )}    

              { spell.material && (
                <p className="page-text-sm"><strong className="mr-2">Materials:</strong>{spell.material}</p>
              )}  
          </>          
        );
      } catch (error) {
        if (
          error?.name === "CanceledError" ||
          error?.name === "AbortError"
        ) {
          return null;
        }

        console.error("Failed to load spell details:", error);
        return <div>Failed to load spell details.</div>;
      }
    }, [spellIndex]);

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
        pagePrefix={`${spellIndex} - `}
        getPageContentFunc={getSpellDetails}
      />
    );
  }
);

GrimoireSpellExtraDetailsPage.displayName = "GrimoireSpellExtraDetailsPage";

export default GrimoireSpellExtraDetailsPage;