import { Button } from "@/components/ui/button.tsx";
import { Cross1Icon } from "@radix-ui/react-icons";

export const BadgeFilter = ({ setList, list }) => {
  const handleCheckedChange = (name, checked) => {
    setList((prevState) =>
      prevState.map((item) =>
        item.name === name ? { ...item, isChecked: !checked } : item,
      ),
    );
  };

  return (
    <ul className="flex gap-2">
      {list.map((value) =>
        value.isChecked ? (
          <li key={value.name}>
            <div className="flex h-6 items-center rounded-full border border-primary bg-[#C7FFC5] py-0.5 pl-2.5 text-sm text-primary">
              {value.name}
              <Button
                variant="ghost"
                className="h-8 w-8 rounded-full p-0 hover:bg-transparent hover:text-primary"
                onClick={() => handleCheckedChange(value.name, value.isChecked)}
              >
                <Cross1Icon className="h-3 w-3" />
              </Button>
            </div>
          </li>
        ) : null,
      )}
    </ul>
  );
};
