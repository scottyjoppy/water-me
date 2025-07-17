import { Plant } from "@/types/databaseValues";
import {
  Heading,
  Html,
  Section,
  Tailwind,
  Text,
  pixelBasedPreset,
} from "@react-email/components";

interface emailProps {
  name: string;
  email: string;
  plants: Plant[];
}

export function Email(props: { props: emailProps }) {
  const user = { name: null };

  return (
    <Html lang="en">
      <Tailwind
        config={{
          presets: [pixelBasedPreset],
        }}
      >
        <Section className="border-8 border-black border-solid rounded-xl">
          <Heading as="h1" className="text-center">
            Hello {user.name ? user.name : "User"}
          </Heading>
          <Text>What is up</Text>
        </Section>
      </Tailwind>
    </Html>
  );
}

export default Email;
