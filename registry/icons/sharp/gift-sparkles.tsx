import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function GiftSparkles({ size = 24, ...props }: IconProps) {
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
      <path d="M22 7L2 7L2 11L22 11L22 7ZM12 7C9 7 7 6 7 4.5C7 3.1193 8.1193 2 9.5 2C11.5 2 12 5 12 7ZM12 7C15 7 17 6 17 4.5C17 3.1193 15.8807 2 14.5 2C12.5 2 12 5 12 7ZM20 13L20 11L4 11L4 22L13 22"/>
      <path d="M19.5492 15.3739L20.4196 17.5804L22.6261 18.4508C22.8518 18.5397 23 18.7576 23 19C23 19.2424 22.8518 19.4603 22.6261 19.5492L20.4196 20.4196L19.5492 22.6261C19.4603 22.8518 19.2424 23 19 23C18.7576 23 18.5397 22.8518 18.4508 22.6261L17.5804 20.4196L15.3739 19.5492C15.1482 19.4603 15 19.2424 15 19C15 18.7576 15.1482 18.5397 15.3739 18.4508L17.5804 17.5804L18.4508 15.3739C18.5397 15.1482 18.7576 15 19 15C19.2424 15 19.4603 15.1482 19.5492 15.3739ZM11.8433 14.2337L12.3873 15.6127L13.7663 16.1567C13.9074 16.2123 14 16.3485 14 16.5C14 16.6515 13.9074 16.7877 13.7663 16.8433L12.3873 17.3873L11.8433 18.7663C11.7877 18.9074 11.6515 19 11.5 19C11.3485 19 11.2123 18.9074 11.1567 18.7663L10.6127 17.3873L9.2337 16.8433C9.0926 16.7877 9 16.6515 9 16.5C9 16.3485 9.0926 16.2123 9.2337 16.1567L10.6127 15.6127L11.1567 14.2337C11.2123 14.0926 11.3485 14 11.5 14C11.6515 14 11.7877 14.0926 11.8433 14.2337Z" fill="currentColor" stroke="none"/>
    </svg>
  )
}
