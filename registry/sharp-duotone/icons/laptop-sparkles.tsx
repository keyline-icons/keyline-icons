import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function LaptopSparkles({ size = 24, ...props }: IconProps) {
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
      <path d="M4 17L4 5L13 5M20 12L20 17M2 17L22 17L22 21L2 21L2 17Z"/>
      <path d="M19.5492 2.3739L20.4196 4.5804L22.6261 5.4508C22.8518 5.5397 23 5.7576 23 6C23 6.2424 22.8518 6.4603 22.6261 6.5492L20.4196 7.4196L19.5492 9.6261C19.4603 9.8518 19.2424 10 19 10C18.7576 10 18.5397 9.8518 18.4508 9.6261L17.5804 7.4196L15.3739 6.5492C15.1482 6.4603 15 6.2424 15 6C15 5.7576 15.1482 5.5397 15.3739 5.4508L17.5804 4.5804L18.4508 2.3739C18.5397 2.1482 18.7576 2 19 2C19.2424 2 19.4603 2.1482 19.5492 2.3739Z" fill="currentColor" stroke="none"/>
      <path d="M13.8433 9.2337L14.3873 10.6127L15.7663 11.1567C15.9074 11.2123 16 11.3485 16 11.5C16 11.6515 15.9074 11.7877 15.7663 11.8433L14.3873 12.3873L13.8433 13.7663C13.7877 13.9074 13.6515 14 13.5 14C13.3485 14 13.2123 13.9074 13.1567 13.7663L12.6127 12.3873L11.2337 11.8433C11.0926 11.7877 11 11.6515 11 11.5C11 11.3485 11.0926 11.2123 11.2337 11.1567L12.6127 10.6127L13.1567 9.2337C13.2123 9.0926 13.3485 9 13.5 9C13.6515 9 13.7877 9.0926 13.8433 9.2337Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
    </svg>
  )
}
