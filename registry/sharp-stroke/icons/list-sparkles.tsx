import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function ListSparkles({ size = 24, ...props }: IconProps) {
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
      <path d="M7 6L13 6M7 13L22 13M8 20L22 20"/>
      <path d="M5 6C5 6.8284 4.3284 7.5 3.5 7.5C2.6716 7.5 2 6.8284 2 6C2 5.1716 2.6716 4.5 3.5 4.5C4.3284 4.5 5 5.1716 5 6ZM5 13C5 13.8284 4.3284 14.5 3.5 14.5C2.6716 14.5 2 13.8284 2 13C2 12.1716 2.6716 11.5 3.5 11.5C4.3284 11.5 5 12.1716 5 13Z" fill="currentColor" stroke="none"/>
      <path d="M19.5492 2.3739L20.4196 4.5804L22.6261 5.4508C22.8518 5.5397 23 5.7576 23 6C23 6.2424 22.8518 6.4603 22.6261 6.5492L20.4196 7.4196L19.5492 9.6261C19.4603 9.8518 19.2424 10 19 10C18.7576 10 18.5397 9.8518 18.4508 9.6261L17.5804 7.4196L15.3739 6.5492C15.1482 6.4603 15 6.2424 15 6C15 5.7576 15.1482 5.5397 15.3739 5.4508L17.5804 4.5804L18.4508 2.3739C18.5397 2.1482 18.7576 2 19 2C19.2424 2 19.4603 2.1482 19.5492 2.3739ZM3.8433 17.2337L4.3873 18.6127L5.7663 19.1567C5.9074 19.2123 6 19.3485 6 19.5C6 19.6515 5.9074 19.7877 5.7663 19.8433L4.3873 20.3873L3.8433 21.7663C3.7877 21.9074 3.6515 22 3.5 22C3.3485 22 3.2123 21.9074 3.1567 21.7663L2.6127 20.3873L1.2337 19.8433C1.0926 19.7877 1 19.6515 1 19.5C1 19.3485 1.0926 19.2123 1.2337 19.1567L2.6127 18.6127L3.1567 17.2337C3.2123 17.0926 3.3485 17 3.5 17C3.6515 17 3.7877 17.0926 3.8433 17.2337Z" fill="currentColor" stroke="none"/>
    </svg>
  )
}
