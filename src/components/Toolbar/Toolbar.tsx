import { ReactNode } from "react";

interface ToolbarProps {
  title: string
  children?: ReactNode
}
const Toolbar = ({ title, children }: ToolbarProps) => {
  return (
    <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <h2 className="text-title-md2 font-semibold text-black dark:text-white">{title}</h2>
        {children}
    </div>
  )
}

export default Toolbar
