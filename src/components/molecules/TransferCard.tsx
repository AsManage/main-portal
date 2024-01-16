import { Flex, Link, Text } from "@chakra-ui/react";
import moment from "moment";
import { showData } from "utils/common";

type Props = {
  date?: string;
  from?: string;
  to?: string;
  note?: string;
  onClickFrom?: () => void;
  onClickTo?: () => void;
};

export function TransferCard({
  date,
  from,
  to,
  note,
  onClickFrom,
  onClickTo,
}: Props) {
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
        &nbsp;Assigned from&nbsp;
        {from === "INVENTORY" ? (
          <span
            style={{
              fontWeight: "bold",
            }}
          >
            INVENTORY
          </span>
        ) : (
          <Link color="var(--chakra-colors-purple-500)" onClick={onClickFrom}>
            {showData(from)}
          </Link>
        )}
        &nbsp;to
        {to === "INVENTORY" ? (
          <span
            style={{
              fontWeight: "bold",
            }}
          >
            INVENTORY
          </span>
        ) : (
          <Link color="var(--chakra-colors-purple-500)" onClick={onClickTo}>
            {" "}
            {showData(to)}
          </Link>
        )}
        &nbsp;
        {note ? `(${note})` : null}
      </Text>
    </Flex>
  );
}
