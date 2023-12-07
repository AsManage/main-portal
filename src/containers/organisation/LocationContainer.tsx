import { Box } from "@chakra-ui/react";
import { PaperWrapper } from "components/atoms/PaperWrapper";

import React from "react";
import FolderTree from "react-folder-tree";
import "react-responsive-pagination/themes/classic.css";
import {
  IoCaretDownCircleOutline,
  IoCaretForwardCircleOutline,
} from "react-icons/io5";
import { TbDoor } from "react-icons/tb";

import { FaRegBuilding } from "react-icons/fa";

type Props = {};

const LocationContainer = () => {
  return (
    <Box>
      <PaperWrapper label="Location">
        <Box>
          <FolderTree
            data={{
              name: "Location Structural",
              isOpen: true,
              children: [
                {
                  name: "Location 1",
                  isOpen: true,
                },
                {
                  name: "Location 3",
                  isOpen: true,
                },
              ],
              isRoot: true,
            }}
            showCheckbox={false}
            onNameClick={(e) => {
              //   if (!e.nodeData.isRoot) {
              //     setSelectedOU(e.nodeData.data);
              //     onOpenDrawer();
              //   }
            }}
            iconComponents={{
              FolderIcon: FaRegBuilding,
              FolderOpenIcon: FaRegBuilding,
              FileIcon: TbDoor,
              CaretRightIcon: IoCaretForwardCircleOutline,
              CaretDownIcon: IoCaretDownCircleOutline,
            }}
          />
        </Box>
      </PaperWrapper>
    </Box>
  );
};

export default React.memo(LocationContainer);
