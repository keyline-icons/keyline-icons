import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function CalendarSparkles({ size = 24, ...props }: IconProps) {
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
      <path d="M12 20L3 20L3 4L21 4L21 13M12 10L18 10M8 1L8 7M16 1L16 7"/>
      <path d="M18.5492 15.3739L19.4196 17.5804L21.6261 18.4508C21.8518 18.5397 22 18.7576 22 19C22 19.2424 21.8518 19.4603 21.6261 19.5492L19.4196 20.4196L18.5492 22.6261C18.4603 22.8518 18.2424 23 18 23C17.7576 23 17.5397 22.8518 17.4508 22.6261L16.5804 20.4196L14.3739 19.5492C14.1482 19.4603 14 19.2424 14 19C14 18.7576 14.1482 18.5397 14.3739 18.4508L16.5804 17.5804L17.4508 15.3739C17.5397 15.1482 17.7576 15 18 15C18.2424 15 18.4603 15.1482 18.5492 15.3739ZM9.8433 11.2337L10.3873 12.6127L11.7663 13.1567C11.9074 13.2123 12 13.3485 12 13.5C12 13.6515 11.9074 13.7877 11.7663 13.8433L10.3873 14.3873L9.8433 15.7663C9.7877 15.9074 9.6515 16 9.5 16C9.3485 16 9.2123 15.9074 9.1567 15.7663L8.6127 14.3873L7.2337 13.8433C7.0926 13.7877 7 13.6515 7 13.5C7 13.3485 7.0926 13.2123 7.2337 13.1567L8.6127 12.6127L9.1567 11.2337C9.2123 11.0926 9.3485 11 9.5 11C9.6515 11 9.7877 11.0926 9.8433 11.2337Z" fill="currentColor" stroke="none"/>
    </svg>
  )
}
