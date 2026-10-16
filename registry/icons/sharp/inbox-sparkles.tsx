import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function InboxSparkles({ size = 24, ...props }: IconProps) {
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
      <path d="M20.3868 11.5228L22 14.1534L22 22L2 22L2 14.1534L7 6L13 6M2 15L8 15L10 18L14 18L16 15L22 15"/>
      <path d="M19.5492 1.3739L20.4196 3.5804L22.6261 4.4508C22.8518 4.5397 23 4.7576 23 5C23 5.2424 22.8518 5.4603 22.6261 5.5492L20.4196 6.4196L19.5492 8.6261C19.4603 8.8518 19.2424 9 19 9C18.7576 9 18.5397 8.8518 18.4508 8.6261L17.5804 6.4196L15.3739 5.5492C15.1482 5.4603 15 5.2424 15 5C15 4.7576 15.1482 4.5397 15.3739 4.4508L17.5804 3.5804L18.4508 1.3739C18.5397 1.1482 18.7576 1 19 1C19.2424 1 19.4603 1.1482 19.5492 1.3739ZM12.8433 9.2337L13.3873 10.6127L14.7663 11.1567C14.9074 11.2123 15 11.3485 15 11.5C15 11.6515 14.9074 11.7877 14.7663 11.8433L13.3873 12.3873L12.8433 13.7663C12.7877 13.9074 12.6515 14 12.5 14C12.3485 14 12.2123 13.9074 12.1567 13.7663L11.6127 12.3873L10.2337 11.8433C10.0926 11.7877 10 11.6515 10 11.5C10 11.3485 10.0926 11.2123 10.2337 11.1567L11.6127 10.6127L12.1567 9.2337C12.2123 9.0926 12.3485 9 12.5 9C12.6515 9 12.7877 9.0926 12.8433 9.2337Z" fill="currentColor" stroke="none"/>
    </svg>
  )
}
