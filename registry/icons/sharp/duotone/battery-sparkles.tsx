import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function BatterySparkles({ size = 24, ...props }: IconProps) {
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
      <path d="M2 10L2 6L18 6L18 18L10 18M22 8.5L22 15.5"/>
      <path d="M5.5492 11.3739L6.4196 13.5804L8.6261 14.4508C8.8518 14.5397 9 14.7576 9 15C9 15.2424 8.8518 15.4603 8.6261 15.5492L6.4196 16.4196L5.5492 18.6261C5.4603 18.8518 5.2424 19 5 19C4.7576 19 4.5397 18.8518 4.4508 18.6261L3.5804 16.4196L1.3739 15.5492C1.1482 15.4603 1 15.2424 1 15C1 14.7576 1.1482 14.5397 1.3739 14.4508L3.5804 13.5804L4.4508 11.3739C4.5397 11.1482 4.7576 11 5 11C5.2424 11 5.4603 11.1482 5.5492 11.3739Z" fill="currentColor" stroke="none"/>
      <path d="M11.8433 9.2337L12.3873 10.6127L13.7663 11.1567C13.9074 11.2123 14 11.3485 14 11.5C14 11.6515 13.9074 11.7877 13.7663 11.8433L12.3873 12.3873L11.8433 13.7663C11.7877 13.9074 11.6515 14 11.5 14C11.3485 14 11.2123 13.9074 11.1567 13.7663L10.6127 12.3873L9.2337 11.8433C9.0926 11.7877 9 11.6515 9 11.5C9 11.3485 9.0926 11.2123 9.2337 11.1567L10.6127 10.6127L11.1567 9.2337C11.2123 9.0926 11.3485 9 11.5 9C11.6515 9 11.7877 9.0926 11.8433 9.2337Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
    </svg>
  )
}
