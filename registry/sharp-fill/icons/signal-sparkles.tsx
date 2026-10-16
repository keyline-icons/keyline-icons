import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function SignalSparkles({ size = 24, ...props }: IconProps) {
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
      <path d="M7 23L7 17M12 23L12 13M17 23L17 9M22 23L22 5"/>
      <path d="M1 21L3 21L3 23L1 23ZM6.5492 1.3739L7.4196 3.5804L9.6261 4.4508C9.8518 4.5397 10 4.7576 10 5C10 5.2424 9.8518 5.4603 9.6261 5.5492L7.4196 6.4196L6.5492 8.6261C6.4603 8.8518 6.2424 9 6 9C5.7576 9 5.5397 8.8518 5.4508 8.6261L4.5804 6.4196L2.3739 5.5492C2.1482 5.4603 2 5.2424 2 5C2 4.7576 2.1482 4.5397 2.3739 4.4508L4.5804 3.5804L5.4508 1.3739C5.5397 1.1482 5.7576 1 6 1C6.2424 1 6.4603 1.1482 6.5492 1.3739ZM14.8433 1.2337L15.3873 2.6127L16.7663 3.1567C16.9074 3.2123 17 3.3485 17 3.5C17 3.6515 16.9074 3.7877 16.7663 3.8433L15.3873 4.3873L14.8433 5.7663C14.7877 5.9074 14.6515 6 14.5 6C14.3485 6 14.2123 5.9074 14.1567 5.7663L13.6127 4.3873L12.2337 3.8433C12.0926 3.7877 12 3.6515 12 3.5C12 3.3485 12.0926 3.2123 12.2337 3.1567L13.6127 2.6127L14.1567 1.2337C14.2123 1.0926 14.3485 1 14.5 1C14.6515 1 14.7877 1.0926 14.8433 1.2337Z" fill="currentColor" stroke="none"/>
    </svg>
  )
}
