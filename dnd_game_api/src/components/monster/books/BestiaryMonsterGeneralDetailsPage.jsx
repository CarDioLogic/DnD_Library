import { useCallback, useEffect, useRef, forwardRef } from "react";
import Page from "../../flipbook/Page";
import { fetchMonsterDetails } from "../../../../apiClient/monsterApi";
import { baseApiUrl } from "../../../../Core/constants";
import Icon from "../../general/Icon";
import { ABILITIES } from "../../../../Data/Abilities";
import { formatAbilityModifier, formatArmorClass } from "../../../../Core/helpers";

const BestiaryMonsterGeneralDetailsPage = forwardRef(
  ({ monsterIndex, pageNumber, currentPage }, ref) => {
    const controllerRef = useRef(null);

    const getMonsterDetails = useCallback(async () => {
      if (controllerRef.current) {
        controllerRef.current.abort();
      }

      const controller = new AbortController();
      controllerRef.current = controller;

      try {
        const monster = await fetchMonsterDetails(
          monsterIndex,
          controller.signal
        );
      
        return (
          <>
            <p className="text-center">{monster.alignment}</p>
            <img
              title={monster.name}
              src={`${baseApiUrl + monster.image}`}
              alt={monster.name}
              className="page-monster-avatar border rounded-[50%] mb-4 text-center mx-auto"
            />

            <section>
              <div class="isolate">
                <div class="noise"></div>
                <div class="overlay"></div>
              </div>
            </section>
            
            <h1 title="" className="page-text-xl font-bold break-words leading-none">{monster.name}</h1>
            <p title="Monster type" className="break-words">{`${monster.type} ${monster.subtype ?? ""}`}</p>
            <hr className="my-2"></hr>

            <div className="flex justify-between mb-2">
              <Icon
                parentClasses="justify-end"
                title="Challenge Rating"
                imgSrc={`/images/misc/ifrit.svg`}
                altText="ifrit icon"
                label={`${monster.challenge_rating} (${monster.xp} XP)`}
              />       
              <Icon
                title="Size"
                imgSrc={`/images/misc/measure-tape.svg`}
                altText="measure tape icon"
                label={monster.size}
              />  
            </div>  

            <div className="flex justify-between mb-2">
              <Icon
                title="Hit Points"
                imgSrc={`/images/misc/heart.svg`}
                altText="heart icon"
                label={`${monster.hit_points} (${monster.hit_points_roll}) HP`}
              />
              <Icon
                title="Armor class"
                imgSrc={`/images/misc/armor.svg`}
                altText="heart icon"
                label={formatArmorClass(monster.armor_class)}
              />
            </div>    
    

            <div className="mt-4">
              <div className="flex justify-between">              
                {ABILITIES.map(ability => (
                    <div className="text-center" key={ability}>
                      <p className="page-text-base">{ability.slice(0,3).toUpperCase()}</p>
                      <p className="font-bold page-text-xs">{monster[ability]} ({formatAbilityModifier(monster[ability])})</p>
                    </div>
                ))}
              </div>
            </div>
          </>
        );
      } catch (error) {
        if (
          error?.name === "CanceledError" ||
          error?.name === "AbortError"
        ) {
          return null;
        }

        console.error("Failed to load monster details:", error);
        return <div>Failed to load monster details.</div>;
      }
    }, [monsterIndex]);

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
        pagePrefix={`${monsterIndex} - `}
        getPageContentFunc={getMonsterDetails}
      />
    );
  }
);

BestiaryMonsterGeneralDetailsPage.displayName = "BestiaryMonsterGeneralDetailsPage";

export default BestiaryMonsterGeneralDetailsPage;