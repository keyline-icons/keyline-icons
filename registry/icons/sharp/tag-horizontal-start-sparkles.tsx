import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function TagHorizontalStartSparkles({ size = 24, ...props }: IconProps) {
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
      <path d="M14 4L9.1716 4L2 12L9.1716 20L22 20L22 12"/>
      <path d="M10.5 12C10.5 12.8284 9.8284 13.5 9 13.5C8.1716 13.5 7.5 12.8284 7.5 12C7.5 11.1716 8.1716 10.5 9 10.5C9.8284 10.5 10.5 11.1716 10.5 12ZM19.5492 3.3739L20.4196 5.5804L22.6261 6.4508C22.8518 6.5397 23 6.7576 23 7C23 7.2424 22.8518 7.4603 22.6261 7.5492L20.4196 8.4196L19.5492 10.6261C19.4603 10.8518 19.2424 11 19 11C18.7576 11 18.5397 10.8518 18.4508 10.6261L17.5804 8.4196L15.3739 7.5492C15.1482 7.4603 15 7.2424 15 7C15 6.7576 15.1482 6.5397 15.3739 6.4508L17.5804 5.5804L18.4508 3.3739C18.5397 3.1482 18.7576 3 19 3C19.2424 3 19.4603 3.1482 19.5492 3.3739ZM14.8433 12.2337L15.3873 13.6127L16.7663 14.1567C16.9074 14.2123 17 14.3485 17 14.5C17 14.6515 16.9074 14.7877 16.7663 14.8433L15.3873 15.3873L14.8433 16.7663C14.7877 16.9074 14.6515 17 14.5 17C14.3485 17 14.2123 16.9074 14.1567 16.7663L13.6127 15.3873L12.2337 14.8433C12.0926 14.7877 12 14.6515 12 14.5C12 14.3485 12.0926 14.2123 12.2337 14.1567L13.6127 13.6127L14.1567 12.2337C14.2123 12.0926 14.3485 12 14.5 12C14.6515 12 14.7877 12.0926 14.8433 12.2337Z" fill="currentColor" stroke="none"/>
    </svg>
  )
}
