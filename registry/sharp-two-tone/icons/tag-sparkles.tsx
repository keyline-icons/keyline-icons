import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function TagSparkles({ size = 24, ...props }: IconProps) {
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
      <path d="M20.938 11.6785L22 12.8284L12.8284 22L2 12L2 2L13 2"/>
      <path d="M9.5 8C9.5 8.8284 8.8284 9.5 8 9.5C7.1716 9.5 6.5 8.8284 6.5 8C6.5 7.1716 7.1716 6.5 8 6.5C8.8284 6.5 9.5 7.1716 9.5 8ZM19.5492 1.3739L20.4196 3.5804L22.6261 4.4508C22.8518 4.5397 23 4.7576 23 5C23 5.2424 22.8518 5.4603 22.6261 5.5492L20.4196 6.4196L19.5492 8.6261C19.4603 8.8518 19.2424 9 19 9C18.7576 9 18.5397 8.8518 18.4508 8.6261L17.5804 6.4196L15.3739 5.5492C15.1482 5.4603 15 5.2424 15 5C15 4.7576 15.1482 4.5397 15.3739 4.4508L17.5804 3.5804L18.4508 1.3739C18.5397 1.1482 18.7576 1 19 1C19.2424 1 19.4603 1.1482 19.5492 1.3739Z" fill="currentColor" stroke="none"/>
      <path d="M14.8433 8.2337L15.3873 9.6127L16.7663 10.1567C16.9074 10.2123 17 10.3485 17 10.5C17 10.6515 16.9074 10.7877 16.7663 10.8433L15.3873 11.3873L14.8433 12.7663C14.7877 12.9074 14.6515 13 14.5 13C14.3485 13 14.2123 12.9074 14.1567 12.7663L13.6127 11.3873L12.2337 10.8433C12.0926 10.7877 12 10.6515 12 10.5C12 10.3485 12.0926 10.2123 12.2337 10.1567L13.6127 9.6127L14.1567 8.2337C14.2123 8.0926 14.3485 8 14.5 8C14.6515 8 14.7877 8.0926 14.8433 8.2337Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
    </svg>
  )
}
