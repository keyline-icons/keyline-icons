import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function ShirtSparkles({ size = 24, ...props }: IconProps) {
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
      <path d="M10 22L6 22L5.5 10.5L1.9999 8.5L3.5 4L9 2C9 3.6569 10.3431 5 12 5C13.6569 5 15 3.6569 15 2L20.5 4L22.0001 8.5L18.5 10.5L18.3932 12.9566"/>
      <path d="M16.5492 15.3739L17.4196 17.5804L19.6261 18.4508C19.8518 18.5397 20 18.7576 20 19C20 19.2424 19.8518 19.4603 19.6261 19.5492L17.4196 20.4196L16.5492 22.6261C16.4603 22.8518 16.2424 23 16 23C15.7576 23 15.5397 22.8518 15.4508 22.6261L14.5804 20.4196L12.3739 19.5492C12.1482 19.4603 12 19.2424 12 19C12 18.7576 12.1482 18.5397 12.3739 18.4508L14.5804 17.5804L15.4508 15.3739C15.5397 15.1482 15.7576 15 16 15C16.2424 15 16.4603 15.1482 16.5492 15.3739Z" fill="currentColor" stroke="none"/>
      <path d="M11.8433 11.2337L12.3873 12.6127L13.7663 13.1567C13.9074 13.2123 14 13.3485 14 13.5C14 13.6515 13.9074 13.7877 13.7663 13.8433L12.3873 14.3873L11.8433 15.7663C11.7877 15.9074 11.6515 16 11.5 16C11.3485 16 11.2123 15.9074 11.1567 15.7663L10.6127 14.3873L9.2337 13.8433C9.0926 13.7877 9 13.6515 9 13.5C9 13.3485 9.0926 13.2123 9.2337 13.1567L10.6127 12.6127L11.1567 11.2337C11.2123 11.0926 11.3485 11 11.5 11C11.6515 11 11.7877 11.0926 11.8433 11.2337Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
    </svg>
  )
}
