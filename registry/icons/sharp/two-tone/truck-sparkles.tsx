import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function TruckSparkles({ size = 24, ...props }: IconProps) {
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
      <path d="M14 20L14 6L11 6M2 11L2 20L5 20M9 20L14 20M19 20L22 20L22 14.1716L17.8284 10L14 10M9 20C9 21.1046 8.1046 22 7 22C5.8954 22 5 21.1046 5 20C5 18.8954 5.8954 18 7 18C8.1046 18 9 18.8954 9 20ZM19 20C19 21.1046 18.1046 22 17 22C15.8954 22 15 21.1046 15 20C15 18.8954 15.8954 18 17 18C18.1046 18 19 18.8954 19 20Z"/>
      <path d="M5.5492 1.3739L6.4196 3.5804L8.6261 4.4508C8.8518 4.5397 9 4.7576 9 5C9 5.2424 8.8518 5.4603 8.6261 5.5492L6.4196 6.4196L5.5492 8.6261C5.4603 8.8518 5.2424 9 5 9C4.7576 9 4.5397 8.8518 4.4508 8.6261L3.5804 6.4196L1.3739 5.5492C1.1482 5.4603 1 5.2424 1 5C1 4.7576 1.1482 4.5397 1.3739 4.4508L3.5804 3.5804L4.4508 1.3739C4.5397 1.1482 4.7576 1 5 1C5.2424 1 5.4603 1.1482 5.5492 1.3739Z" fill="currentColor" stroke="none"/>
      <path d="M8.8433 9.2337L9.3873 10.6127L10.7663 11.1567C10.9074 11.2123 11 11.3485 11 11.5C11 11.6515 10.9074 11.7877 10.7663 11.8433L9.3873 12.3873L8.8433 13.7663C8.7877 13.9074 8.6515 14 8.5 14C8.3485 14 8.2123 13.9074 8.1567 13.7663L7.6127 12.3873L6.2337 11.8433C6.0926 11.7877 6 11.6515 6 11.5C6 11.3485 6.0926 11.2123 6.2337 11.1567L7.6127 10.6127L8.1567 9.2337C8.2123 9.0926 8.3485 9 8.5 9C8.6515 9 8.7877 9.0926 8.8433 9.2337Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
    </svg>
  )
}
