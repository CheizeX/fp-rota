"use client";

import { useMemoizedCallback } from "@/hooks/use-memoized-callback";
import { CalendarIcon } from "@/icons/icons";
import type { Selection } from "@fichap-team/fichapui";
import { Avatar, Button, Card, useDisclosure } from "@fichap-team/fichapui";
import { Icon } from "@iconify/react";
import dynamic from "next/dynamic";
import React, { useMemo, useState } from "react";
import { Emotion } from "./components/cells/Emotion";
import { RiskLevel } from "./components/cells/RiskLevel";
import { RotationPredictionModal } from "./modals/RotationPredictionModal";
import { TableBottomContent } from "./components/TableBottomContent";
import { TableFilterModal } from "./modals/TableFilterModal";
import { TableFilters } from "./components/TableFilters";
import { TableHeader } from "./components/TableHeader";
import { COLUMNS, INITIAL_VISIBLE_COLUMNS, users } from "@/data/tableData";
import { useTableFiltering } from "@/hooks/table/useTableFiltering";
import { useTablePagination } from "@/hooks/table/useTablePagination";
import { useTableSorting } from "@/hooks/table/useTableSorting";
import { ColumnsKeyType, UserType } from "@/types/table";

const TableContent = dynamic(
  () => import("./components/TableContent").then((mod) => mod.TableContent),
  { ssr: false }
);

type LibraryKey = string;

export default function Table() {
  const [selectedKeys, setSelectedKeys] = useState<Selection>(new Set([]));
  const [visibleColumns, setVisibleColumns] = useState<Selection>(
    new Set(INITIAL_VISIBLE_COLUMNS)
  );
  const [selectedUser, setSelectedUser] = useState<UserType | null>(null);

  // Control de modales
  const {
    isOpen: isFilterModalOpen,
    onOpen: onOpenFilterModal,
    onOpenChange: onFilterModalOpenChange,
  } = useDisclosure();
  const {
    isOpen: isPredictionModalOpen,
    onOpen: onOpenPredictionModal,
    onOpenChange: onPredictionModalOpenChange,
  } = useDisclosure();

  // Filtros y Ordenamiento
  const {
    filterValue,
    setFilterValue,
    filteredItems,
    riskLevelFilter,
    setRiskLevelFilter,
    dateFilter,
    setDateFilter,
    minENPS,
    setMinENPS,
    maxENPS,
    setMaxENPS,
    minRisk,
    setMinRisk,
    maxRisk,
    setMaxRisk,
    selectedEmotions,
    setSelectedEmotions,
    orgUnits,
    selectedOrgUnits,
    setSelectedOrgUnits,
  } = useTableFiltering(users);

  const {
    sortDescriptor,
    setSortDescriptor,
    sortedItems: sortedFilteredItems,
  } = useTableSorting(filteredItems);

  const {
    page,
    setPage,
    pages,
    items: paginatedItems,
    onPageChange,
  } = useTablePagination(sortedFilteredItems);

  // Memos
  const headerColumns = useMemo(() => {
    if (visibleColumns === "all") return COLUMNS;

    return COLUMNS.map((item) => ({
      ...item,
      sortDirection:
        item.uid === sortDescriptor.column
          ? sortDescriptor.direction
          : undefined,
    })).filter((column) => Array.from(visibleColumns).includes(column.uid));
  }, [visibleColumns, sortDescriptor]);

  // Ajustar el número de páginas
  const filterSelectedKeys = useMemo(() => {
    if (typeof selectedKeys === "string" && selectedKeys === "all")
      return selectedKeys;

    let resultKeys = new Set<LibraryKey>();
    const currentSelected = selectedKeys as Set<LibraryKey>;

    filteredItems.forEach((item) => {
      const stringId = String(item.id);
      if (currentSelected.has(stringId)) {
        resultKeys.add(stringId);
      }
    });

    return resultKeys;
  }, [selectedKeys, filteredItems]);

  // CELDAS
  const renderCell = useMemoizedCallback(
    (user: UserType, columnKey: React.Key) => {
      const userKey = columnKey as ColumnsKeyType;

      switch (userKey) {
        case "name":
          return (
            <div className="flex items-center gap-2">
              <Avatar name={user.name} src={user.avatar} size="sm" />
              <div className="text-nowrap text-tiny capitalize text-default-foreground">
                {user.name}
              </div>
            </div>
          );
        case "riskPercentage":
          return <RiskLevel percentage={user.riskPercentage} />;
        case "exitDate":
          return (
            <div className="flex items-center gap-2 text-nowrap text-tiny text-default-foreground">
              <CalendarIcon className="text-lg text-default-400" />
              {user.exitDate}
            </div>
          );
        case "emotion":
          return <Emotion emotion={user.emotion} />;
        case "eNPS":
          return (
            <div className="text-nowrap text-tiny text-default-foreground font-medium">
              {user.eNPS}
            </div>
          );
        case "actions":
          return (
            <Button
              isIconOnly
              size="lg"
              variant="light"
              className="mx-auto"
              onPress={() => {
                setSelectedUser(user);
                onOpenPredictionModal();
              }}
            >
              <Icon icon="lucide:eye" />
            </Button>
          );
        default:
          return userKey in user
            ? (user[userKey as keyof UserType] as React.ReactNode)
            : null;
      }
    }
  );

  const onSearchChange = useMemoizedCallback((value?: string) => {
    const newFilterValue = value || "";
    setFilterValue(newFilterValue);
    setPage(1);
  });

  // Handle selection changes, considering pagination and filtering
  const onSelectionChange = useMemoizedCallback((keys: Selection) => {
    if (typeof keys === "string" && keys === "all") {
      const allFilteredKeys = new Set<LibraryKey>(
        filteredItems.map((item) => String(item.id))
      );
      setSelectedKeys(allFilteredKeys);
      return;
    }

    const keysSet = keys as Set<LibraryKey>;
    const isDeselectAllOperation =
      ((typeof selectedKeys === "string" && selectedKeys === "all") ||
        (selectedKeys as Set<LibraryKey>).size > 0) &&
      keysSet.size === 0;

    if (isDeselectAllOperation) {
      setSelectedKeys(new Set<LibraryKey>());
      return;
    }

    const previousFullSelection =
      typeof selectedKeys === "string" && selectedKeys === "all"
        ? new Set<LibraryKey>(filteredItems.map((item) => String(item.id)))
        : (selectedKeys as Set<LibraryKey>);

    const newFullSelection = new Set<LibraryKey>(previousFullSelection);

    paginatedItems.forEach((item) => {
      const key = String(item.id);
      if (keysSet.has(key)) {
        newFullSelection.add(key);
      } else {
        newFullSelection.delete(key);
      }
    });

    const finalFilteredSelection = new Set<LibraryKey>();
    newFullSelection.forEach((key) => {
      if (filteredItems.some((item) => String(item.id) === key)) {
        finalFilteredSelection.add(key);
      }
    });

    setSelectedKeys(finalFilteredSelection);
  });

  return (
    <section className="min-h-[652px] max-h-[652px] w-full px-2 sm:px-4">
      <Card className="px-2 py-4 sm:p-6 mx-auto space-y-4 dark:bg-default-50 shadow-lg min-h-[366px]">
        <TableHeader />

        <TableFilters
          filterValue={filterValue}
          onSearchChange={onSearchChange}
          visibleColumns={visibleColumns}
          setVisibleColumns={setVisibleColumns}
          filterSelectedKeys={filterSelectedKeys}
          headerColumns={headerColumns}
          sortDescriptor={sortDescriptor}
          setSortDescriptor={setSortDescriptor}
          setPage={setPage}
          onOpenFilters={onOpenFilterModal}
          riskLevelFilter={riskLevelFilter}
          setRiskLevelFilter={setRiskLevelFilter}
        />

        <TableContent
          headerColumns={headerColumns}
          sortedItems={paginatedItems}
          renderCell={renderCell}
          onSelectionChange={onSelectionChange}
          filterSelectedKeys={filterSelectedKeys}
          sortDescriptor={sortDescriptor}
          setSortDescriptor={setSortDescriptor}
        />

        <TableBottomContent
          filterSelectedKeys={filterSelectedKeys}
          page={page}
          pages={pages}
          filteredItemsLength={filteredItems.length}
          onPreviousPage={() => onPageChange(page - 1)}
          onNextPage={() => onPageChange(page + 1)}
          onPageChange={onPageChange}
        />
      </Card>

      <TableFilterModal
        isOpen={isFilterModalOpen}
        onOpenChange={onFilterModalOpenChange}
        dateFilter={dateFilter}
        setDateFilter={setDateFilter}
        minENPS={minENPS}
        setMinENPS={setMinENPS}
        maxENPS={maxENPS}
        setMaxENPS={setMaxENPS}
        minRisk={minRisk}
        setMinRisk={setMinRisk}
        maxRisk={maxRisk}
        setMaxRisk={setMaxRisk}
        selectedEmotions={selectedEmotions}
        setSelectedEmotions={setSelectedEmotions}
        orgUnits={orgUnits}
        selectedOrgUnits={selectedOrgUnits}
        setSelectedOrgUnits={setSelectedOrgUnits}
      />

      <RotationPredictionModal
        isOpen={isPredictionModalOpen}
        onClose={onPredictionModalOpenChange}
        user={selectedUser}
      />
    </section>
  );
}
