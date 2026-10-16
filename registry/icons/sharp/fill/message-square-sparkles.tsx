import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function MessageSquareSparkles({ size = 24, ...props }: IconProps) {
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
      <path d="M21 12.1246L21 17L7 17L3 21L3 3L11.8754 3"/>
      <path d="M18.5492 2.3739L19.4196 4.5804L21.6261 5.4508C21.8518 5.5397 22 5.7576 22 6C22 6.2424 21.8518 6.4603 21.6261 6.5492L19.4196 7.4196L18.5492 9.6261C18.4603 9.8518 18.2424 10 18 10C17.7576 10 17.5397 9.8518 17.4508 9.6261L16.5804 7.4196L14.3739 6.5492C14.1482 6.4603 14 6.2424 14 6C14 5.7576 14.1482 5.5397 14.3739 5.4508L16.5804 4.5804L17.4508 2.3739C17.5397 2.1482 17.7576 2 18 2C18.2424 2 18.4603 2.1482 18.5492 2.3739ZM9.8433 8.2337L10.3873 9.6127L11.7663 10.1567C11.9074 10.2123 12 10.3485 12 10.5C12 10.6515 11.9074 10.7877 11.7663 10.8433L10.3873 11.3873L9.8433 12.7663C9.7877 12.9074 9.6515 13 9.5 13C9.3485 13 9.2123 12.9074 9.1567 12.7663L8.6127 11.3873L7.2337 10.8433C7.0926 10.7877 7 10.6515 7 10.5C7 10.3485 7.0926 10.2123 7.2337 10.1567L8.6127 9.6127L9.1567 8.2337C9.2123 8.0926 9.3485 8 9.5 8C9.6515 8 9.7877 8.0926 9.8433 8.2337Z" fill="currentColor" stroke="none"/>
    </svg>
  )
}
