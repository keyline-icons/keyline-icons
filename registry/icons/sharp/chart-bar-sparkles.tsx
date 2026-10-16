import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function ChartBarSparkles({ size = 24, ...props }: IconProps) {
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
      <path d="M2 2L2 21L21 21M5 12L13 12M5 17L19 17"/>
      <path d="M19.5492 2.3739L20.4196 4.5804L22.6261 5.4508C22.8518 5.5397 23 5.7576 23 6C23 6.2424 22.8518 6.4603 22.6261 6.5492L20.4196 7.4196L19.5492 9.6261C19.4603 9.8518 19.2424 10 19 10C18.7576 10 18.5397 9.8518 18.4508 9.6261L17.5804 7.4196L15.3739 6.5492C15.1482 6.4603 15 6.2424 15 6C15 5.7576 15.1482 5.5397 15.3739 5.4508L17.5804 4.5804L18.4508 2.3739C18.5397 2.1482 18.7576 2 19 2C19.2424 2 19.4603 2.1482 19.5492 2.3739ZM8.8433 3.2337L9.3873 4.6127L10.7663 5.1567C10.9074 5.2123 11 5.3485 11 5.5C11 5.6515 10.9074 5.7877 10.7663 5.8433L9.3873 6.3873L8.8433 7.7663C8.7877 7.9074 8.6515 8 8.5 8C8.3485 8 8.2123 7.9074 8.1567 7.7663L7.6127 6.3873L6.2337 5.8433C6.0926 5.7877 6 5.6515 6 5.5C6 5.3485 6.0926 5.2123 6.2337 5.1567L7.6127 4.6127L8.1567 3.2337C8.2123 3.0926 8.3485 3 8.5 3C8.6515 3 8.7877 3.0926 8.8433 3.2337Z" fill="currentColor" stroke="none"/>
    </svg>
  )
}
