import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function SmartphoneSparkles({ size = 24, ...props }: IconProps) {
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
      <path d="M9.5 6L14.5 6M19 12.2L19 2L5 2L5 22L9.2 22"/>
      <path d="M16.5492 15.3739L17.4196 17.5804L19.6261 18.4508C19.8518 18.5397 20 18.7576 20 19C20 19.2424 19.8518 19.4603 19.6261 19.5492L17.4196 20.4196L16.5492 22.6261C16.4603 22.8518 16.2424 23 16 23C15.7576 23 15.5397 22.8518 15.4508 22.6261L14.5804 20.4196L12.3739 19.5492C12.1482 19.4603 12 19.2424 12 19C12 18.7576 12.1482 18.5397 12.3739 18.4508L14.5804 17.5804L15.4508 15.3739C15.5397 15.1482 15.7576 15 16 15C16.2424 15 16.4603 15.1482 16.5492 15.3739Z" fill="currentColor" stroke="none"/>
      <path d="M11.8433 10.2337L12.3873 11.6127L13.7663 12.1567C13.9074 12.2123 14 12.3485 14 12.5C14 12.6515 13.9074 12.7877 13.7663 12.8433L12.3873 13.3873L11.8433 14.7663C11.7877 14.9074 11.6515 15 11.5 15C11.3485 15 11.2123 14.9074 11.1567 14.7663L10.6127 13.3873L9.2337 12.8433C9.0926 12.7877 9 12.6515 9 12.5C9 12.3485 9.0926 12.2123 9.2337 12.1567L10.6127 11.6127L11.1567 10.2337C11.2123 10.0926 11.3485 10 11.5 10C11.6515 10 11.7877 10.0926 11.8433 10.2337Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
    </svg>
  )
}
