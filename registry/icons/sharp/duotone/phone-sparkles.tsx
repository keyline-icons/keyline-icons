import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function PhoneSparkles({ size = 24, ...props }: IconProps) {
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
      <path d="M2 4L2 2L9 2L9 8L7.0953 9.4285C8.5144 12.802 11.198 15.4856 14.5715 16.9047L16 15L22 15L22 22L20 22C10.0589 22 2 13.9411 2 4Z"/>
      <path d="M19.5492 1.3739L20.4196 3.5804L22.6261 4.4508C22.8518 4.5397 23 4.7576 23 5C23 5.2424 22.8518 5.4603 22.6261 5.5492L20.4196 6.4196L19.5492 8.6261C19.4603 8.8518 19.2424 9 19 9C18.7576 9 18.5397 8.8518 18.4508 8.6261L17.5804 6.4196L15.3739 5.5492C15.1482 5.4603 15 5.2424 15 5C15 4.7576 15.1482 4.5397 15.3739 4.4508L17.5804 3.5804L18.4508 1.3739C18.5397 1.1482 18.7576 1 19 1C19.2424 1 19.4603 1.1482 19.5492 1.3739Z" fill="currentColor" stroke="none"/>
      <path d="M3.8433 18.2337L4.3873 19.6127L5.7663 20.1567C5.9074 20.2123 6 20.3485 6 20.5C6 20.6515 5.9074 20.7877 5.7663 20.8433L4.3873 21.3873L3.8433 22.7663C3.7877 22.9074 3.6515 23 3.5 23C3.3485 23 3.2123 22.9074 3.1567 22.7663L2.6127 21.3873L1.2337 20.8433C1.0926 20.7877 1 20.6515 1 20.5C1 20.3485 1.0926 20.2123 1.2337 20.1567L2.6127 19.6127L3.1567 18.2337C3.2123 18.0926 3.3485 18 3.5 18C3.6515 18 3.7877 18.0926 3.8433 18.2337Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
    </svg>
  )
}
