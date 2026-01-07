
"use client"

import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Drawer,
  DrawerContent,
  DrawerTrigger,
} from "@/components/ui/drawer"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { useIsMobile } from "@/hooks/use-mobile"

type ComboboxProps = {
  items: { value: string; label: string }[];
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  searchPlaceholder: string;
  noResultsMessage: string;
  className?: string;
};

function ComboboxContent({
    items,
    value,
    onChange,
    searchPlaceholder,
    noResultsMessage,
    onSelect
}: Omit<ComboboxProps, 'className' | 'placeholder'> & {onSelect: () => void}) {
    return (
        <Command>
            <CommandInput 
                placeholder={searchPlaceholder} 
            />
            <CommandList>
                <CommandEmpty>{noResultsMessage}</CommandEmpty>
                <CommandGroup>
                {items.map((item) => (
                    <CommandItem
                    key={item.value}
                    value={item.value}
                    onSelect={(currentValue) => {
                        onChange(currentValue.toLowerCase() === value.toLowerCase() ? "" : item.value);
                        onSelect();
                    }}
                    >
                    <Check
                        className={cn(
                        "mr-2 h-4 w-4",
                        value.toLowerCase() === item.value.toLowerCase() ? "opacity-100" : "opacity-0"
                        )}
                    />
                    {item.label}
                    </CommandItem>
                ))}
                </CommandGroup>
            </CommandList>
        </Command>
    );
}

export function Combobox({
  items,
  value,
  onChange,
  placeholder,
  searchPlaceholder,
  noResultsMessage,
  className,
}: ComboboxProps) {
  const [open, setOpen] = React.useState(false);
  const isMobile = useIsMobile();

  const selectedLabel = items.find((item) => item.value.toLowerCase() === value.toLowerCase())?.label;

  if (isMobile) {
    return (
        <Drawer open={open} onOpenChange={setOpen}>
            <DrawerTrigger asChild>
                <Button variant="outline" className={cn("w-full justify-start", className)}>
                    {selectedLabel ? selectedLabel : placeholder}
                </Button>
            </DrawerTrigger>
            <DrawerContent>
                <div className="mt-4 border-t">
                    <ComboboxContent 
                        items={items}
                        value={value}
                        onChange={onChange}
                        searchPlaceholder={searchPlaceholder}
                        noResultsMessage={noResultsMessage}
                        onSelect={() => setOpen(false)}
                    />
                </div>
            </DrawerContent>
        </Drawer>
    );
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn("w-full justify-between", className)}
        >
          {selectedLabel ? selectedLabel : placeholder}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[--radix-popover-trigger-width] p-0" align="start">
        <ComboboxContent 
            items={items}
            value={value}
            onChange={onChange}
            searchPlaceholder={searchPlaceholder}
            noResultsMessage={noResultsMessage}
            onSelect={() => setOpen(false)}
        />
      </PopoverContent>
    </Popover>
  )
}
