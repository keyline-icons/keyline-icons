import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function FolderSparkles({ size = 24, ...props }: IconProps) {
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
      <path d="M12.2 20L3 20L3 4L9.5 4L12 6.5L21 6.5L21 11.2"/>
      <path d="M18.5492 13.3739L19.4196 15.5804L21.6261 16.4508C21.8518 16.5397 22 16.7576 22 17C22 17.2424 21.8518 17.4603 21.6261 17.5492L19.4196 18.4196L18.5492 20.6261C18.4603 20.8518 18.2424 21 18 21C17.7576 21 17.5397 20.8518 17.4508 20.6261L16.5804 18.4196L14.3739 17.5492C14.1482 17.4603 14 17.2424 14 17C14 16.7576 14.1482 16.5397 14.3739 16.4508L16.5804 15.5804L17.4508 13.3739C17.5397 13.1482 17.7576 13 18 13C18.2424 13 18.4603 13.1482 18.5492 13.3739Z" fill="currentColor" stroke="none"/>
      <path d="M12.8433 10.2337L13.3873 11.6127L14.7663 12.1567C14.9074 12.2123 15 12.3485 15 12.5C15 12.6515 14.9074 12.7877 14.7663 12.8433L13.3873 13.3873L12.8433 14.7663C12.7877 14.9074 12.6515 15 12.5 15C12.3485 15 12.2123 14.9074 12.1567 14.7663L11.6127 13.3873L10.2337 12.8433C10.0926 12.7877 10 12.6515 10 12.5C10 12.3485 10.0926 12.2123 10.2337 12.1567L11.6127 11.6127L12.1567 10.2337C12.2123 10.0926 12.3485 10 12.5 10C12.6515 10 12.7877 10.0926 12.8433 10.2337Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
    </svg>
  )
}
