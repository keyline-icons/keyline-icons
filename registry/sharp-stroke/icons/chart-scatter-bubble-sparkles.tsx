import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function ChartScatterBubbleSparkles({ size = 24, ...props }: IconProps) {
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
      <path d="M3 2L3 21L22 21M11 14C11 15.1046 10.1046 16 9 16C7.8954 16 7 15.1046 7 14C7 12.8954 7.8954 12 9 12C10.1046 12 11 12.8954 11 14Z"/>
      <path d="M17.5492 2.3739L18.4196 4.5804L20.6261 5.4508C20.8518 5.5397 21 5.7576 21 6C21 6.2424 20.8518 6.4603 20.6261 6.5492L18.4196 7.4196L17.5492 9.6261C17.4603 9.8518 17.2424 10 17 10C16.7576 10 16.5397 9.8518 16.4508 9.6261L15.5804 7.4196L13.3739 6.5492C13.1482 6.4603 13 6.2424 13 6C13 5.7576 13.1482 5.5397 13.3739 5.4508L15.5804 4.5804L16.4508 2.3739C16.5397 2.1482 16.7576 2 17 2C17.2424 2 17.4603 2.1482 17.5492 2.3739ZM17.8433 13.2337L18.3873 14.6127L19.7663 15.1567C19.9074 15.2123 20 15.3485 20 15.5C20 15.6515 19.9074 15.7877 19.7663 15.8433L18.3873 16.3873L17.8433 17.7663C17.7877 17.9074 17.6515 18 17.5 18C17.3485 18 17.2123 17.9074 17.1567 17.7663L16.6127 16.3873L15.2337 15.8433C15.0926 15.7877 15 15.6515 15 15.5C15 15.3485 15.0926 15.2123 15.2337 15.1567L16.6127 14.6127L17.1567 13.2337C17.2123 13.0926 17.3485 13 17.5 13C17.6515 13 17.7877 13.0926 17.8433 13.2337Z" fill="currentColor" stroke="none"/>
    </svg>
  )
}
