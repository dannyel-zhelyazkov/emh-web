import { ConditionalComponent } from '@/components'
import { DataTableFilters, DataTablePagination } from '@/components/tables/base'
import { HeaderItems, Pagination, RowItems } from '@/hooks/@types'
import { OptionItem, TriggerFunctionComponent } from '@/ui/@types'
import { BaseActionsMenu } from '@/ui/dropdowns/BaseActionsMenu.tsx'
import { faEllipsis } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

type DataTableProps<T extends Record<string, any>> = {
  loading?: boolean
  rows: RowItems<T>
  headers: HeaderItems<T>
  actions: OptionItem<T>[][]
  pagination: Pagination
}

export const DataTable = <T extends Record<string, any>>({
  loading,
  rows,
  headers,
  actions,
  pagination,
}: DataTableProps<T>) => {
  const actionTrigger: TriggerFunctionComponent = (onClick) => (
    <FontAwesomeIcon
      className="rounded-half p-2 hover:bg-blue"
      icon={faEllipsis}
      onClick={onClick}
    />
  )

  return (
    <div>
      <div className="mb-4 flex w-full justify-between">
        <DataTableFilters filterOptions={[]} />
        <DataTablePagination pagination={pagination} />
      </div>
      <ConditionalComponent show={!loading}>
        <table className="w-full">
          <thead>
            <tr>
              {Object.entries(headers).map(([key, header]) => (
                <th
                  key={key}
                  className="border-r-2 border-secondary-25 bg-blue p-2 text-center text-large text-white first:rounded-tl-half"
                >
                  {header}
                </th>
              ))}
              <th className="cursor-pointer rounded-tr-half bg-blue p-2 text-center text-large text-white">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="font-bold">
            {Object.keys(rows).map((id, index) => (
              <tr key={id} className="odd:bg-lite-blue-50 even:bg-lite-blue">
                {Object.keys(rows[id]).map((key) => {
                  const rowsData = rows[id][key]

                  const display = rowsData.render
                    ? rowsData.render(rows[id] as T)
                    : rowsData.value

                  return (
                    <td
                      key={key}
                      className="cursor-pointer border-r-2 border-t-2 border-secondary-25 p-3 text-center"
                    >
                      {display}
                    </td>
                  )
                })}
                <td className="w-24 cursor-pointer border-t-2 border-secondary-25 text-center">
                  <BaseActionsMenu
                    options={actions[index]}
                    trigger={actionTrigger}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </ConditionalComponent>
    </div>
  )
}
