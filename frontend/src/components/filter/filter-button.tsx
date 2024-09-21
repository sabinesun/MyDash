import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu.tsx";
import { Button } from "@/components/ui/button.tsx";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import { Dispatch, SetStateAction } from "react";
import { SelectionItem } from "@/types";

type FilterButtonProps = {
  list: SelectionItem[],
  setList: Dispatch<SetStateAction<SelectionItem[]>>,
  label: string,
  icon: JSX.Element,
}

export const FilterButton = ({ list, setList, label, icon }: FilterButtonProps) => {
  const handleCheckedChange = ({ name, isChecked }: SelectionItem) => {
    setList((prevState) =>
      prevState.map((item) =>
        item.name === name ? { ...item, isChecked: !isChecked } : item,
      ),
    );
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="mx-2 gap-2 bg-white">
          {icon}
          {label}
          <ChevronDownIcon />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        {list.map((item) => (
          <DropdownMenuCheckboxItem
            checked={item.isChecked}
            onCheckedChange={() =>
              handleCheckedChange(item)
            }
            key={item.name}
          >
            {item.name}
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
