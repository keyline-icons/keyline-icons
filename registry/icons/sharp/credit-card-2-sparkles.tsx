import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function CreditCard2Sparkles({ size = 24, ...props }: IconProps) {
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
      <path d="M7 13L22 13M13 7.5L18 7.5M2 5L2 2L22 2L22 18L11 18"/>
      <path d="M5.5492 15.3739L6.4196 17.5804L8.6261 18.4508C8.8518 18.5397 9 18.7576 9 19C9 19.2424 8.8518 19.4603 8.6261 19.5492L6.4196 20.4196L5.5492 22.6261C5.4603 22.8518 5.2424 23 5 23C4.7576 23 4.5397 22.8518 4.4508 22.6261L3.5804 20.4196L1.3739 19.5492C1.1482 19.4603 1 19.2424 1 19C1 18.7576 1.1482 18.5397 1.3739 18.4508L3.5804 17.5804L4.4508 15.3739C4.5397 15.1482 4.7576 15 5 15C5.2424 15 5.4603 15.1482 5.5492 15.3739ZM4.8433 6.2337L5.3873 7.6127L6.7663 8.1567C6.9074 8.2123 7 8.3485 7 8.5C7 8.6515 6.9074 8.7877 6.7663 8.8433L5.3873 9.3873L4.8433 10.7663C4.7877 10.9074 4.6515 11 4.5 11C4.3485 11 4.2123 10.9074 4.1567 10.7663L3.6127 9.3873L2.2337 8.8433C2.0926 8.7877 2 8.6515 2 8.5C2 8.3485 2.0926 8.2123 2.2337 8.1567L3.6127 7.6127L4.1567 6.2337C4.2123 6.0926 4.3485 6 4.5 6C4.6515 6 4.7877 6.0926 4.8433 6.2337Z" fill="currentColor" stroke="none"/>
    </svg>
  )
}
