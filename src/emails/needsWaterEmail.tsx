import { Plant } from "@/types/databaseValues";
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
  // export function Email({
  //   name = "Alexander",
  //   email = "test@example.com",
  //   plants = [],
  // }: emailProps) {
  //   plants = [
  //     {
  //       id: "123",
  //       plant_name: "Tim",
  //       frequency: { type: "every-day", interval: 1 },
  //       last_watered: "2025-07-10",
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
              {plants.map((plant) => (
                <Text key={plant.id}>
                  {plant.plant_name} - Last watered {plant.last_watered}
                </Text>
              ))}
              <Section className="flex justify-center">
                <Button
                  href="https://water-me-now.vercel.app/myplants"
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
