import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function CameraSparkles({ size = 24, ...props }: IconProps) {
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
      <path d="M2 19L2 4L7.5 4L9.0001 2L14.9999 2L16.5 4L22 4L22 13M15 11C15 12.6569 13.6569 14 12 14C10.3431 14 9 12.6569 9 11C9 9.3431 10.3431 8 12 8C13.6569 8 15 9.3431 15 11Z"/>
      <path d="M19.5492 15.3739L20.4196 17.5804L22.6261 18.4508C22.8518 18.5397 23 18.7576 23 19C23 19.2424 22.8518 19.4603 22.6261 19.5492L20.4196 20.4196L19.5492 22.6261C19.4603 22.8518 19.2424 23 19 23C18.7576 23 18.5397 22.8518 18.4508 22.6261L17.5804 20.4196L15.3739 19.5492C15.1482 19.4603 15 19.2424 15 19C15 18.7576 15.1482 18.5397 15.3739 18.4508L17.5804 17.5804L18.4508 15.3739C18.5397 15.1482 18.7576 15 19 15C19.2424 15 19.4603 15.1482 19.5492 15.3739ZM7.8433 16.2337L8.3873 17.6127L9.7663 18.1567C9.9074 18.2123 10 18.3485 10 18.5C10 18.6515 9.9074 18.7877 9.7663 18.8433L8.3873 19.3873L7.8433 20.7663C7.7877 20.9074 7.6515 21 7.5 21C7.3485 21 7.2123 20.9074 7.1567 20.7663L6.6127 19.3873L5.2337 18.8433C5.0926 18.7877 5 18.6515 5 18.5C5 18.3485 5.0926 18.2123 5.2337 18.1567L6.6127 17.6127L7.1567 16.2337C7.2123 16.0926 7.3485 16 7.5 16C7.6515 16 7.7877 16.0926 7.8433 16.2337Z" fill="currentColor" stroke="none"/>
    </svg>
  )
}
