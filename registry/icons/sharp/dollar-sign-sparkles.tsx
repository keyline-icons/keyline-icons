import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function DollarSignSparkles({ size = 24, ...props }: IconProps) {
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
      <path d="M8 1L8 2L8 22L8 23M13 4L6 4C3.7909 4 2 5.7909 2 8C2 10.2091 3.7909 12 6 12L10 12C12.2091 12 14 13.7909 14 16C14 18.2091 12.2091 20 10 20L4 20L3 20"/>
      <path d="M19.5492 1.3739L20.4196 3.5804L22.6261 4.4508C22.8518 4.5397 23 4.7576 23 5C23 5.2424 22.8518 5.4603 22.6261 5.5492L20.4196 6.4196L19.5492 8.6261C19.4603 8.8518 19.2424 9 19 9C18.7576 9 18.5397 8.8518 18.4508 8.6261L17.5804 6.4196L15.3739 5.5492C15.1482 5.4603 15 5.2424 15 5C15 4.7576 15.1482 4.5397 15.3739 4.4508L17.5804 3.5804L18.4508 1.3739C18.5397 1.1482 18.7576 1 19 1C19.2424 1 19.4603 1.1482 19.5492 1.3739ZM20.8433 11.2337L21.3873 12.6127L22.7663 13.1567C22.9074 13.2123 23 13.3485 23 13.5C23 13.6515 22.9074 13.7877 22.7663 13.8433L21.3873 14.3873L20.8433 15.7663C20.7877 15.9074 20.6515 16 20.5 16C20.3485 16 20.2123 15.9074 20.1567 15.7663L19.6127 14.3873L18.2337 13.8433C18.0926 13.7877 18 13.6515 18 13.5C18 13.3485 18.0926 13.2123 18.2337 13.1567L19.6127 12.6127L20.1567 11.2337C20.2123 11.0926 20.3485 11 20.5 11C20.6515 11 20.7877 11.0926 20.8433 11.2337Z" fill="currentColor" stroke="none"/>
    </svg>
  )
}
