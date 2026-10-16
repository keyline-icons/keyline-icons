import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function ClockSparkles({ size = 24, ...props }: IconProps) {
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
      <path d="M16.5431 20.9108C15.1799 21.6072 13.6358 22 12 22C6.4771 22 2 17.5228 2 12C2 6.4771 6.4771 2 12 2C12.0668 2 12.1335 2.0007 12.2 2.002M12 5L12 12L18 12"/>
      <path d="M19.5492 1.3739L20.4196 3.5804L22.6261 4.4508C22.8518 4.5397 23 4.7576 23 5C23 5.2424 22.8518 5.4603 22.6261 5.5492L20.4196 6.4196L19.5492 8.6261C19.4603 8.8518 19.2424 9 19 9C18.7576 9 18.5397 8.8518 18.4508 8.6261L17.5804 6.4196L15.3739 5.5492C15.1482 5.4603 15 5.2424 15 5C15 4.7576 15.1482 4.5397 15.3739 4.4508L17.5804 3.5804L18.4508 1.3739C18.5397 1.1482 18.7576 1 19 1C19.2424 1 19.4603 1.1482 19.5492 1.3739ZM19.8433 14.2337L20.3873 15.6127L21.7663 16.1567C21.9074 16.2123 22 16.3485 22 16.5C22 16.6515 21.9074 16.7877 21.7663 16.8433L20.3873 17.3873L19.8433 18.7663C19.7877 18.9074 19.6515 19 19.5 19C19.3485 19 19.2123 18.9074 19.1567 18.7663L18.6127 17.3873L17.2337 16.8433C17.0926 16.7877 17 16.6515 17 16.5C17 16.3485 17.0926 16.2123 17.2337 16.1567L18.6127 15.6127L19.1567 14.2337C19.2123 14.0926 19.3485 14 19.5 14C19.6515 14 19.7877 14.0926 19.8433 14.2337Z" fill="currentColor" stroke="none"/>
    </svg>
  )
}
