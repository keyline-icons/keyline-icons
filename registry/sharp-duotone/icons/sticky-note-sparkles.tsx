import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function StickyNoteSparkles({ size = 24, ...props }: IconProps) {
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
      <path d="M12.2 21L3 21L3 3L15 3L21 9L21 12.2M15 3L15 9L21 9"/>
      <path d="M18.5492 14.3739L19.4196 16.5804L21.6261 17.4508C21.8518 17.5397 22 17.7576 22 18C22 18.2424 21.8518 18.4603 21.6261 18.5492L19.4196 19.4196L18.5492 21.6261C18.4603 21.8518 18.2424 22 18 22C17.7576 22 17.5397 21.8518 17.4508 21.6261L16.5804 19.4196L14.3739 18.5492C14.1482 18.4603 14 18.2424 14 18C14 17.7576 14.1482 17.5397 14.3739 17.4508L16.5804 16.5804L17.4508 14.3739C17.5397 14.1482 17.7576 14 18 14C18.2424 14 18.4603 14.1482 18.5492 14.3739Z" fill="currentColor" stroke="none"/>
      <path d="M9.8433 10.2337L10.3873 11.6127L11.7663 12.1567C11.9074 12.2123 12 12.3485 12 12.5C12 12.6515 11.9074 12.7877 11.7663 12.8433L10.3873 13.3873L9.8433 14.7663C9.7877 14.9074 9.6515 15 9.5 15C9.3485 15 9.2123 14.9074 9.1567 14.7663L8.6127 13.3873L7.2337 12.8433C7.0926 12.7877 7 12.6515 7 12.5C7 12.3485 7.0926 12.2123 7.2337 12.1567L8.6127 11.6127L9.1567 10.2337C9.2123 10.0926 9.3485 10 9.5 10C9.6515 10 9.7877 10.0926 9.8433 10.2337Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
    </svg>
  )
}
