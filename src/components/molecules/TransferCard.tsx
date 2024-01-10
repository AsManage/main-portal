import { Flex, Link, Text } from "@chakra-ui/react";
import moment from "moment";
import { showData } from "utils/common";

type Props = {
  date?: string;
  from?: string;
  to?: string;
  note?: string;
};

export function TransferCard({ date, from, to, note }: Props) {
  return (
    <Flex alignItems="center" gap="12px">
      <Text>
        <span
          style={{
            fontWeight: "bold",
          }}
        >
          [{showData(moment(date).format("YYYY-MM-DD HH:mm:ss"))}]
        </span>
        &nbsp;Assigned from
        <Link color="var(--chakra-colors-purple-500)"> {showData(from)} </Link>
        to
        <Link color="var(--chakra-colors-purple-500)"> {showData(to)}</Link>
        &nbsp;
        {note ? `(${note})` : null}
      </Text>
    </Flex>
  );
}
