import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function FileSparkles({ size = 24, ...props }: IconProps) {
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
      <path d="M18 13L18 8L12 2L2 2L2 22L13 22M12 2L12 8L18 8"/>
      <path d="M19.5492 15.3739L20.4196 17.5804L22.6261 18.4508C22.8518 18.5397 23 18.7576 23 19C23 19.2424 22.8518 19.4603 22.6261 19.5492L20.4196 20.4196L19.5492 22.6261C19.4603 22.8518 19.2424 23 19 23C18.7576 23 18.5397 22.8518 18.4508 22.6261L17.5804 20.4196L15.3739 19.5492C15.1482 19.4603 15 19.2424 15 19C15 18.7576 15.1482 18.5397 15.3739 18.4508L17.5804 17.5804L18.4508 15.3739C18.5397 15.1482 18.7576 15 19 15C19.2424 15 19.4603 15.1482 19.5492 15.3739ZM10.8433 12.2337L11.3873 13.6127L12.7663 14.1567C12.9074 14.2123 13 14.3485 13 14.5C13 14.6515 12.9074 14.7877 12.7663 14.8433L11.3873 15.3873L10.8433 16.7663C10.7877 16.9074 10.6515 17 10.5 17C10.3485 17 10.2123 16.9074 10.1567 16.7663L9.6127 15.3873L8.2337 14.8433C8.0926 14.7877 8 14.6515 8 14.5C8 14.3485 8.0926 14.2123 8.2337 14.1567L9.6127 13.6127L10.1567 12.2337C10.2123 12.0926 10.3485 12 10.5 12C10.6515 12 10.7877 12.0926 10.8433 12.2337Z" fill="currentColor" stroke="none"/>
    </svg>
  )
}
