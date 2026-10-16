import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function MonitorSparkles({ size = 24, ...props }: IconProps) {
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
      <path d="M12 16L12 20M7 20L17 20" strokeOpacity="0.4"/>
      <path d="M22 12.8L22 16L2 16L2 4L13.2 4"/>
      <path d="M19.5492 3.3739L20.4196 5.5804L22.6261 6.4508C22.8518 6.5397 23 6.7576 23 7C23 7.2424 22.8518 7.4603 22.6261 7.5492L20.4196 8.4196L19.5492 10.6261C19.4603 10.8518 19.2424 11 19 11C18.7576 11 18.5397 10.8518 18.4508 10.6261L17.5804 8.4196L15.3739 7.5492C15.1482 7.4603 15 7.2424 15 7C15 6.7576 15.1482 6.5397 15.3739 6.4508L17.5804 5.5804L18.4508 3.3739C18.5397 3.1482 18.7576 3 19 3C19.2424 3 19.4603 3.1482 19.5492 3.3739Z" fill="currentColor" stroke="none"/>
      <path d="M12.8433 8.2337L13.3873 9.6127L14.7663 10.1567C14.9074 10.2123 15 10.3485 15 10.5C15 10.6515 14.9074 10.7877 14.7663 10.8433L13.3873 11.3873L12.8433 12.7663C12.7877 12.9074 12.6515 13 12.5 13C12.3485 13 12.2123 12.9074 12.1567 12.7663L11.6127 11.3873L10.2337 10.8433C10.0926 10.7877 10 10.6515 10 10.5C10 10.3485 10.0926 10.2123 10.2337 10.1567L11.6127 9.6127L12.1567 8.2337C12.2123 8.0926 12.3485 8 12.5 8C12.6515 8 12.7877 8.0926 12.8433 8.2337Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
    </svg>
  )
}
