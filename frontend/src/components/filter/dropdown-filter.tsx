import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu.tsx";
import { Button } from "@/components/ui/button.tsx";
import { ChevronDownIcon } from "@radix-ui/react-icons";

export const Filter = ({ list, setList, label, icon }) => {
  const handleCheckedChange = (name, checked) => {
    setList((prevState) =>
      prevState.map((item) =>
        item.name === name ? { ...item, isChecked: !checked } : item,
      ),
    );
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="mx-2 gap-2">
          {icon}
          {label} <ChevronDownIcon />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        {list.map((item) => (
          <DropdownMenuCheckboxItem
            checked={item.isChecked}
            onCheckedChange={() =>
              handleCheckedChange(item.name, item.isChecked)
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
