import { useCallback, useEffect, useRef, forwardRef } from "react";
import Page from "../../flipbook/Page";
import { fetchMonsterDetails } from "../../../../apiClient/monsterApi";
import { baseApiUrl } from "../../../../Core/constants";
import Icon from "../../general/Icon";
import { ABILITIES } from "../../../../Data/Abilities";

const BestiaryMonsterDetailsPage = forwardRef(
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
          <div>
            <p className="text-center">{monster.alignment}</p>
            <img
              title={monster.name}
              src={`${baseApiUrl + monster.image}`}
              alt={monster.name}
              className="h-48 border rounded-[50%] mb-4 text-center mx-auto"
            />
            
            <h1 title="" className="text-xl font-bold break-words leading-none">{monster.name}</h1>
            <p title="Monster type" className="break-words">{`${monster.type} ${monster.subtype ?? ""}`}</p>
            <hr className="mb-4"></hr>

            <div className="flex justify-between">
              <Icon
                title="Size"
                imgSrc={`/images/misc/measure-tape.svg`}
                altText="measure tape icon"
                label={monster.size}
              />

              <Icon
                title="Hit Points"
                imgSrc={`/images/misc/heart.svg`}
                altText="heart icon"
                label={`${monster.hit_points} HP`}
              />
            </div>
            <p title="Experience Points" className="break-words text-end">{monster.xp} XP</p>

            <Icon
              parentClasses="justify-end"
              title="Challenge Rating"
              imgSrc={`/images/misc/ifrit.svg`}
              altText="ifrit icon"
              label={monster.challenge_rating}
            />

            <div className="mt-4">
              <h1>Abilities:</h1>
              <div className="flex justify-between flex-wrap">              
                {ABILITIES.map(ability => (
                  <Icon
                    key={ability}
                    title={ability}
                    imgSrc={`/images/abilities/${ability}.svg`}
                    altText={`${ability} icon`}
                    label={monster[ability]}
                  />
                ))}
              </div>
            </div>
          </div>
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
        getPageContentFunc={getMonsterDetails}
      />
    );
  }
);

BestiaryMonsterDetailsPage.displayName = "BestiaryMonsterDetailsPage";

export default BestiaryMonsterDetailsPage;