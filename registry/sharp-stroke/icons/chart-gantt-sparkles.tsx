import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function ChartGanttSparkles({ size = 24, ...props }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="butt"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d="M3 2L3 21L22 21M6 7L13 7M9 12L17 12M12 17L17 17"/>
      <path d="M19.5492 2.3739L20.4196 4.5804L22.6261 5.4508C22.8518 5.5397 23 5.7576 23 6C23 6.2424 22.8518 6.4603 22.6261 6.5492L20.4196 7.4196L19.5492 9.6261C19.4603 9.8518 19.2424 10 19 10C18.7576 10 18.5397 9.8518 18.4508 9.6261L17.5804 7.4196L15.3739 6.5492C15.1482 6.4603 15 6.2424 15 6C15 5.7576 15.1482 5.5397 15.3739 5.4508L17.5804 4.5804L18.4508 2.3739C18.5397 2.1482 18.7576 2 19 2C19.2424 2 19.4603 2.1482 19.5492 2.3739ZM20.8433 12.2337L21.3873 13.6127L22.7663 14.1567C22.9074 14.2123 23 14.3485 23 14.5C23 14.6515 22.9074 14.7877 22.7663 14.8433L21.3873 15.3873L20.8433 16.7663C20.7877 16.9074 20.6515 17 20.5 17C20.3485 17 20.2123 16.9074 20.1567 16.7663L19.6127 15.3873L18.2337 14.8433C18.0926 14.7877 18 14.6515 18 14.5C18 14.3485 18.0926 14.2123 18.2337 14.1567L19.6127 13.6127L20.1567 12.2337C20.2123 12.0926 20.3485 12 20.5 12C20.6515 12 20.7877 12.0926 20.8433 12.2337Z" fill="currentColor" stroke="none"/>
    </svg>
  )
}
