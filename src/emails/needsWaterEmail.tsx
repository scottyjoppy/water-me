import { Plant } from "@/types/databaseValues";
import getNextWaterDate from "@/utils/getNextWaterDate";
import {
  Button,
  Heading,
  Html,
  Section,
  Tailwind,
  Text,
  pixelBasedPreset,
} from "@react-email/components";

interface emailProps {
  name: string;
  plants: Plant[];
}

export function NeedsWaterEmail({ name, plants }: emailProps) {
  // export function NeedsWaterEmail({
  //   name = "Alexander",
  //   plants = [],
  // }: emailProps) {
  //   plants = [
  //     {
  //       id: "123",
  //       plant_name: "Tim",
  //       frequency: { type: "every-day", interval: 2 },
  //       last_watered: "2025-07-22 00:00:00+00",
  //       sort_order: 10,
  //       user_id: "123",
  //     },
  //   ];

  return (
    <Html lang="en">
      <Tailwind
        config={{
          presets: [pixelBasedPreset],
        }}
      >
        <Section className="border-8 border-black border-solid bg-amber-400 rounded-xl p-4">
          <Heading as="h1" className="text-center">
            Hello, {name || "User"}
          </Heading>
          <Heading as="h2" className="italic text-center">
            Your plants need watering.
          </Heading>
          {Array.isArray(plants) && plants.length > 0 ? (
            <>
              {plants.map((plant) => {
                const nextWater = getNextWaterDate(plant);

                return (
                  <Text key={plant.id}>
                    {plant.last_watered ? (
                      <>
                        <span className="uppercase font-bold">
                          <u>{plant.plant_name}</u> -{" "}
                        </span>
                        Last Watering{" "}
                        <span className="bg-white px-3 rounded-md">
                          {new Intl.DateTimeFormat("en-GB", {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                          }).format(new Date(plant.last_watered))}
                        </span>{" "}
                        || Next Watering{" "}
                        <span className="bg-white px-3 rounded-md">
                          {typeof nextWater === "string"
                            ? nextWater.toString()
                            : new Intl.DateTimeFormat("en-GB", {
                                day: "numeric",
                                month: "long",
                                year: "numeric",
                              }).format(new Date(nextWater))}
                        </span>
                      </>
                    ) : (
                      <>
                        <span className="uppercase font-bold">
                          <u>{plant.plant_name}</u> -{" "}
                        </span>
                        Last Watering: Never
                      </>
                    )}
                  </Text>
                );
              })}

              <Section className="flex justify-center">
                <Button
                  href="https://water-me-now.eu/myplants"
                  className="bg-blue-300 border-4 border-solid border-black px-3 py-1 uppercase font-bold rounded-xl text-black"
                >
                  Water
                </Button>
              </Section>
            </>
          ) : (
            <Section className="text-center my-10">
              Just kidding no they don&apos;t, ignore this email.
            </Section>
          )}
        </Section>
      </Tailwind>
    </Html>
  );
}

export default NeedsWaterEmail;
