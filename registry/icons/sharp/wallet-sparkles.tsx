import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function WalletSparkles({ size = 24, ...props }: IconProps) {
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
      <path d="M3 12L3 5C3 3.8954 3.8954 3 5 3L18 3L18 7L21 7L21 21L12 21M3 5C3 6.1046 3.8954 7 5 7L18 7M21 12L16 12L16 16L21 16"/>
      <path d="M6.5492 14.3739L7.4196 16.5804L9.6261 17.4508C9.8518 17.5397 10 17.7576 10 18C10 18.2424 9.8518 18.4603 9.6261 18.5492L7.4196 19.4196L6.5492 21.6261C6.4603 21.8518 6.2424 22 6 22C5.7576 22 5.5397 21.8518 5.4508 21.6261L4.5804 19.4196L2.3739 18.5492C2.1482 18.4603 2 18.2424 2 18C2 17.7576 2.1482 17.5397 2.3739 17.4508L4.5804 16.5804L5.4508 14.3739C5.5397 14.1482 5.7576 14 6 14C6.2424 14 6.4603 14.1482 6.5492 14.3739ZM10.8433 10.2337L11.3873 11.6127L12.7663 12.1567C12.9074 12.2123 13 12.3485 13 12.5C13 12.6515 12.9074 12.7877 12.7663 12.8433L11.3873 13.3873L10.8433 14.7663C10.7877 14.9074 10.6515 15 10.5 15C10.3485 15 10.2123 14.9074 10.1567 14.7663L9.6127 13.3873L8.2337 12.8433C8.0926 12.7877 8 12.6515 8 12.5C8 12.3485 8.0926 12.2123 8.2337 12.1567L9.6127 11.6127L10.1567 10.2337C10.2123 10.0926 10.3485 10 10.5 10C10.6515 10 10.7877 10.0926 10.8433 10.2337Z" fill="currentColor" stroke="none"/>
    </svg>
  )
}
